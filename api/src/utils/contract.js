const path = require('path');
const fs = require('fs');
const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const USER_ROLES = require('../const/userRoles');

const query = async (query, options = '',username = 'appUser') => {
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: username,
            discovery: {
                enabled: true,
                asLocalhost: true
            }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('equipment');


        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction(query, options);
        await gateway.disconnect();
        return result;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
}

const invoke = async (type, arg, username = 'appUser') => {
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return false;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: username,
            discovery: {
                enabled: true,
                asLocalhost: true
            }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('equipment');

        // Evaluate the specified transaction.
        if (type == 'createEquipment' || type == 'updateEquipment') {
            var result = await contract.submitTransaction(type, arg.id, arg.name, arg.type, arg.status, arg.user, arg.buyTime, arg.price, arg.model, arg.serialNumber, arg.supplier);
        } else if (type === 'changeEquipmentStatus') {
            var result = await contract.submitTransaction(type, arg.id, arg.status, arg.updatedAt);
        } else if (type === 'changeEquipmentUser') {
            var result = await contract.submitTransaction(type, arg.id, arg.user, arg.updatedAt);
        }
        return result;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return false;
    }
}

const registerUser = async (username, role = USER_ROLES.USER) => {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            console.log(`An identity for the user ${username} already exists in the wallet`);
            return false;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return false;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: username,
            role: role
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
            role: role
        };
        await wallet.put(username, x509Identity);
        console.log(`Successfully registered and enrolled admin user ${username} and imported it into the wallet`);
        return true;
    } catch (error) {
        console.error(`Failed to register user ${username}: ${error}`);
        return false;
    }
}

const prettyJSONString = (inputString) => {
	if (inputString) {
		 return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		 return inputString;
	}
}

module.exports = { query, invoke, registerUser, prettyJSONString };