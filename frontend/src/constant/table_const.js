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
         return '$ ' + cost.toLocaleString({style: 'currency'});
      },
      thStyle: {
         width: '120px'
      },
   },
   {
      key: "usage_rate",
      label: "Usage Rate",
      formatter: () =>{
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
         return '$ ' + campaign_budget.toLocaleString({style: 'currency'});
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
const export_fields = {
   "Id": "id",
   "Campaign Name": "campaign_name",
   "Status": "campaign_status",
   "Used Amount": {
      field: "cost",
      callback: value => {
         return '$ ' + value.toLocaleString({style: 'currency'})
      }
   },
   "Usage Rate": {
      callback: value => {
         return  parseFloat((value.cost/value.campaign_budget*100)).toFixed(2) +  ' %';
      }
   },
   "Budget": {
      field: "campaign_budget",
      callback: value => {
         return '$ ' + value.toLocaleString({style: 'currency'})
      }
   },
   "Start Date": "start_time",
   "End Date": "end_time"
}
export default {
   user_fields,
   campaign_fields,
   export_fields
}