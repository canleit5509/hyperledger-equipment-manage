const EMAIL_MAX_LENGTH = 50
const MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 255
const MAX_LENGTH = 255
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/
const PHONE_REGEX = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/

const getters = {
    validateLogin() {
        return (loginInput) => {
            const errors = {};
            if (!loginInput.email) {
                errors.emptyEmail = true
            }
            if (loginInput.email && !EMAIL_REGEX.test(loginInput.email)) {
                errors.invalidEmail = true
            }
            if (loginInput.email && loginInput.email.trim().length > EMAIL_MAX_LENGTH) {
                errors.emailMaxLength = true
            }
            if (!loginInput.password) {
                errors.emptyPassword = true
            }
            if (loginInput.password && loginInput.password.trim().length < MIN_LENGTH) {
                errors.passwordMinLength = true
            }
            if (loginInput.password && loginInput.password.trim().length > PASSWORD_MAX_LENGTH) {
                errors.passwordMaxLength = true
            }
            if (Object.keys(errors).length) return errors;
            return null
        }
    },
    validateUser() {
        return (user) => {
            const errors = {}
            if (!user.name) {
                errors.emptyUserName = true
            }
            if (user.name && user.name.trim().length > MAX_LENGTH) {
                errors.userNameMaxLength = true
            }
            if (!user.agency_name) {
                errors.emptyAgencyName = true
            }
            if (user.agency_name && user.agency_name.trim().length > MAX_LENGTH) {
                errors.agencyNameMaxLength = true
            }
            if (user.agency_name && user.agency_name.trim().length < 3) {
                errors.agencyNameMinLength = true
            }
            if (!user.email) {
                errors.emptyEmail = true
            }
            if (user.email && !EMAIL_REGEX.test(user.email)) {
                errors.invalidEmail = true
            }
            if (user.email && user.email.trim().length > EMAIL_MAX_LENGTH) {
                errors.emailMaxLength = true
            }
            if (!user.password) {
                errors.emptyPassword = true
            }
            if (user.password && user.password.trim().length > MAX_LENGTH) {
                errors.passwordMaxLength = true
            }
            if (user.password && user.password.trim().length < MIN_LENGTH) {
                errors.passwordMinLength = true
            }

            if (Object.keys(errors).length) return errors;
            return null
        }
    },
    validateProfile() {
        return (profile) => {
            const errors = {}
            if (!profile.phone) {
                errors.invalidFormatPhone = true
            }

            if (profile.phone && !PHONE_REGEX.test(profile.phone)) {
                errors.invalidFormatPhone = true
            }
            if (Object.keys(errors).length) return errors;
            return null
        }
    },
    validatePassword() {
        return (oldPassword, newPassword, confirmPassword) => {
            const errors = {}

            if (!oldPassword) {
                errors.emptyOldPassword = true
            }
            if (!newPassword) {
                errors.emptyNewPassword = true
            }
            if (!confirmPassword) {
                errors.emptyConfirmPassword = true
            }
            if (oldPassword && oldPassword.trim().length > MAX_LENGTH) {
                errors.oldPasswordMaxLength = true
            }
            if (oldPassword && oldPassword.trim().length < MIN_LENGTH) {
                errors.oldPasswordMinLength = true
            }
            if (newPassword && newPassword.trim().length > MAX_LENGTH) {
                errors.newPasswordMaxLength = true
            }
            if (newPassword && newPassword.trim().length < MIN_LENGTH) {
                errors.newPasswordMinLength = true
            }
            if (confirmPassword && confirmPassword.trim().length > MAX_LENGTH) {
                errors.confirmPasswordMaxLength = true
            }
            if (confirmPassword && confirmPassword.trim().length < MIN_LENGTH) {
                errors.confirmPasswordMinLength = true
            }
            if (newPassword.trim() != confirmPassword.trim()) {
                errors.cofirmationNotMatch = true
            }
            if (confirmPassword.trim() && oldPassword.trim() && confirmPassword.trim() && oldPassword.trim() == confirmPassword.trim()) {
                errors.oldPassWordBeSameNewPassword = true
            }
            if (Object.keys(errors).length) return errors;
            return null
        }
    },


    validateCampaign() {
        return (campaign, startDate, startTime, endDate, endTime) => {
            const errors = {}
            if (!campaign.campaign_name) {
                errors.emptyName = true
            }
            if (campaign.campaign_name && campaign.campaign_name.trim().length > MAX_LENGTH) {
                errors.campaignNameMaxLength = true
            }
            if (!campaign.campaign_budget) {
                errors.emptyCampaignBudget = true
            }
            if (campaign.campaign_budget && (parseFloat(campaign.campaign_budget) < 1)) {
                errors.campaignBudgetMin = true
            }
            if (!campaign.bid_amount) {
                errors.emptyBidAmount = true
            }
            if (parseFloat(campaign.bid_amount) > parseFloat(campaign.campaign_budget)) {
                errors.budgetLessThanBidAmount = true
            }
            if (campaign.bid_amount && (parseFloat(campaign.bid_amount) < 1)) {
                errors.campaignBidAmountMin = true
            }
            if (!campaign.campaign_title) {
                errors.emptyCampaignTitle = true
            }
            if (campaign.campaign_title && campaign.campaign_title.trim().length > MAX_LENGTH) {
                errors.campaignTitleMaxLength = true
            }
            if (!campaign.campaign_description) {
                errors.emptyCampaignDescription = true
            }
            if (campaign.campaign_description && campaign.campaign_description.trim().length > MAX_LENGTH) {
                errors.campaignDescriptionMaxLength
            }
            if (!campaign.campaign_url) {
                errors.emptyCampaignUrl = true
            }
            if (campaign.campaign_url && !URL_REGEX.test(campaign.campaign_url)) {
                errors.invalidUrl = true
            }
            if (!campaign.campaign_image_url) {
                errors.emptyCampaignImageUrl = true
            }
            if ((startDate == endDate) && (startTime >= endTime)) {
                errors.endLessThanStart = true
            }
            if (Object.keys(errors).length) return errors
            return null
        }
    }
}

export default {
    namespaced: true,
    getters
}