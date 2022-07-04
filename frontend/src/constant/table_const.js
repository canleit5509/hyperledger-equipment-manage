const user_fields = [{
   key: "_id",
   label: "ID",
   thStyle: {
      width: '180px',
   },
},
{
   key: "name",
   label: "Username",

},
{
   key: "email",
   label: "Email",

   tdClass: 'align-middle'
},
{
   key: "department",
   label: "Department",
   thStyle: {
      width: '80px'
   },
},
{
   key: "phone",
   label: "Phone",
   },
{
   key: "position",
   label: "Role Name",
  
},
{
   key: "update",
   thClass: 'd-none',
   tdClass: 'd-none',
},
{
   key: "delete",
   thClass: 'd-none',
   tdClass: 'd-none',
}
]

const equipment_fields = [
   {
      key: "id",
      label: "ID",
      thStyle: {
         width: '80px',
      },
   },
   {
      key: "name",
      label: "Equipment Name",
   },
   {
      key: "status",
      label: "Status",
   },
   {
      key: "type",
      label: "Type",
   },
   {
      key: "user",
      label: "User",
      thStyle: {
         width: '250px',
      },
   },
   {
      key: "buyTime",
      label: "Buy Time",
   },
   {
      key: "price",
      label: "Price",
   },
   {
      key: "model",
      label: "Model",
   },
   {
      key: "serialNumber",
      label: "Serial Number",
   }
]

const request_fields = [
   {
      key: "status",
      label: "Status",
   },
   {
      key: "type",
      label: "Type",
   },
   {
      key: "Description",
      label: "Description",
   },
   {
      key: "equipmentId",
      label: "Equipment",
   },
   {
      key: "createdBy",
      label: "Created By",
   },
   {
      key: "updatedBy",
      label: "Updated By",
   }
]


export default {
   user_fields,
   equipment_fields
}