const user_fields = [{
   key: "id",
   label: "ID",
   thStyle: {
      width: '80px',
   },
},
{
   key: "name",
   label: "Account Name",
   thStyle: {
      width: '150px'
   },
},
{
   key: "email",
   label: "Email",
   thStyle: {
      width: '150px'
   },
   tdClass: 'align-middle'
},
{
   key: "status",
   label: "Status",
   thStyle: {
      width: '80px'
   },
},
{
   key: "agency_name",
   label: "Agency Name",
   thStyle: {
      width: '150px'
   },

},
{
   key: "role_name",
   label: "Role Name",
   thStyle: {
      width: '150px'
   },
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
const campaign_fields = [{
   key: "id",
   label: "ID",
   thStyle: {
      width: '80px'
   },
},
{
   key: "campaign_name",
   label: "Campaign Name",
   thStyle: {
      width: '240px'
   },
},
{
   key: "campaign_status",
   label: "Status",
   thStyle: {
      width: '80px'
   },
},
{
   key: "cost",
   label: "Used Amount",
   formatter: (cost) => {
      return '$ ' + cost.toLocaleString({ style: 'currency' });
   },
   thStyle: {
      width: '120px'
   },
},
{
   key: "usage_rate",
   label: "Usage Rate",
   formatter: () => {
      return 0 + ' %';
   },
   thStyle: {
      width: '120px'
   },
},
{
   key: "campaign_budget",
   label: "Budget",
   formatter: (campaign_budget) => {
      return '$ ' + campaign_budget.toLocaleString({ style: 'currency' });
   },
   thStyle: {
      width: '120px'
   },
},
{
   key: "start_time",
   label: "Start Time",
   thStyle: {
      width: '150px'
   },
},
{
   key: "end_time",
   label: "End Time",
   thStyle: {
      width: '150px'
   },
},
{
   key: "update",
   thClass: 'd-none',
   tdClass: 'd-none'
},
{
   key: "delete",
   thClass: 'd-none',
   tdClass: 'd-none'
}
]

export default {
   user_fields,
   campaign_fields,
   equipment_fields
}