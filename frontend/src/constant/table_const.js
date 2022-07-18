const user_fields = [
   {
      key: "index",
      label: "#",
      thStyle: {
         width: "60px",
      }
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
         width: '90px'
      },
      tdClass: 'align-middle'
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
      key: "index",
      label: "#",
      thStyle: {
         width: "60px",
      }
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
      format: 'date',
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
      key: "index",
      label: "#",
      thStyle: {
         width: "60px",
      }
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
      key: "description",
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
   equipment_fields,
   request_fields
}