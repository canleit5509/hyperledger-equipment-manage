import moment from 'moment';
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
   },{
      key: "supplier",
      label: "Supplier",
   },
   {
      key: "buyTime",
      label: "Buy Time",
      format: 'date',
      formatter: (value) => {
         return moment(value).format('YYYY-MM-DD');
      }
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
      thStyle: {
         width: "100px",
      }
   },
   {
      key: "type",
      label: "Type",
      thStyle: {
         width: "100px",
      }
   },
   {
      key: "description",
      label: "Description",
   },
   {
      key: "response",
      label: "Response",
   }
]


export default {
   user_fields,
   equipment_fields,
   request_fields
}