<template>
    <div class="tableScr">
      <b-table
        bordered
        id="my-table"
        :items="filterDate"
        :fields="fields"
        :current-page="currentPage"
        :filter="filter"
        show-empty
        fixed
        responsive
        hover
        class="text-center"
      >
        <template #cell(index)="data">
          {{ (currentPage-1)*perPage + data.index + 1 }}
        </template>
        <template v-slot:cell(name)="data">
          <UserName :data="data.item" />
        </template>
        <template v-slot:cell(email)="data">
          <Email :data="data.item" />
        </template>
        <template v-slot:cell(agency_name)="data">
          <AgencyName :data="data.item" />
        </template>
        <template v-slot:cell(role_name)="data">
          <RoleName :data="data.item" />
        </template>
        <template v-slot:cell(campaign_name)="data">
          <CampaignName :data="data.item" />
        </template>
        <template v-slot:cell(status)="data">
          <Status :data="data.item" />
        </template>
        <template v-slot:cell(campaign_status)="data">
          <Status :data="data.item.campaign_status" />
        </template>
        <template v-slot:cell(usage_rate)="data">
          <UsageRate :data="data.item" />
        </template>
        <template v-slot:cell(_id)="data">
          <EditCell :data="data.item" />
        </template>
      </b-table>

      <b-pagination
        size="md"
        @change="fetchData($event)"
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
  </div>
</template>
<script>
import UserName from "./tableCell/UserName.vue";
import Email from "./tableCell/Email.vue";
import AgencyName from "./tableCell/AgencyName.vue";
import RoleName from "./tableCell/RoleName.vue";
import Status from "./tableCell/Status.vue";
import CampaignName from "./tableCell/CampaignName.vue";
import UsageRate from "./tableCell/UsageRate.vue";
import EditCell from "./tableCell/EditCell.vue";
export default {
  name: "Table",
  props: [
    "list",
    "totalItems",
    "currentPage",
    "perPage",
    "fields",
    "filter",
    "searchStart",
    "searchEnd",
  ],
  data() {
    return {
      selectedType: "",
    };
  },
  components: {
    UserName,
    Email,
    AgencyName,
    RoleName,
    Status,
    CampaignName,
    UsageRate,
    EditCell
  },
  async created() {
    this.fetchData(1);
  },
  methods: {
    fetchData(page) {
      this.$emit("getList", page);
    },
    localizeDate(date, key) {
      // Date picker uses ISO format (yyyy-mm-dd), which is UTC. The data
      // contains locale specific date strings (mm/dd/yyyy), which `Date`
      // parses with local time-zone offset instead of UTC. Normalize the
      // ISO date so we're comparing local times.
      if (!date || !date.includes("-")) return date;
      const [yyyy, mm, dd] = date.split("-");
      if (key === "start") {
        return new Date(`${mm}/${dd}/${yyyy}`);
      } else {
        return new Date(`${mm}/${dd}/${yyyy} 23:59:59`);
      }
    },
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(date)
      );
    },
  },
  computed: {
    filteredItems() {
      if (this.filter || !this.filter.trim() === "") {
        return this.list.filter((item) => {
          if (item.campaign_name) {
            return item.campaign_name
              .toUpperCase()
              .includes(this.filter.trim().toUpperCase());
          }
          if (item.name) {
            return item.name
              .toUpperCase()
              .includes(this.filter.trim().toUpperCase());
          }
        });
      } else {
        return this.list;
      }
    },
    filterDate() {
      if (this.searchStart || this.searchEnd) {
        let searchStartDate = this.localizeDate(this.searchStart, "start");
        let searchEndDate = this.localizeDate(this.searchEnd, "end");
        return this.filteredItems.filter((item) => {
          const start = new Date(item.start_time);
          const end = new Date(item.end_time);
          if (searchStartDate && searchEndDate) {
            return searchStartDate <= start && end <= searchEndDate;
          }
          if (searchStartDate && !searchEndDate) {
            return searchStartDate <= start;
          }
          if (!searchStartDate && searchEndDate) {
            return end <= searchEndDate;
          }
        });
      } else {
        return this.filteredItems;
      }
    },
  },
  watch: {
    filterDate(value) {
      this.$emit("toCSV", value);
    },
  },
};
</script>
<style lang="scss">
@import "../assets/style/common.scss";

.tableScr {
  margin-top: 15px;
  .table {
    thead {
      background-color: $color;
      color: white;
    }
    td {
      vertical-align: middle;
    }
    tr:hover {
      .btn-group-modify {
        .icon {
          cursor: pointer;
          display: inline;
        }
      }
    }
  }
  .pagination {
    justify-content: center;
    ::v-deep .page-item.active .page-link {
      background-color: $color;
      border-color: $color;
      color: white;
    }
    ::v-deep .page-item .page-link {
      color: $color;
    }
  }
}
</style>