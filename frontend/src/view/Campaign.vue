<template>
  <div>
    <div class="time-duration d-flex">
      <div>Start Time:</div>
      <div>
        <datetime
          v-model="searchStart"
          class="time"
          format="YYYY-MM-DD"
        ></datetime>
      </div>
      <div>End Time:</div>
      <div>
        <datetime
          v-model="searchEnd"
          class="time"
          format="YYYY-MM-DD"
        ></datetime>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <input v-model="searchText" placeholder="Search campaign name ..."/>
      </div>
      <div class="addictional-button col-sm-6 d-flex flex-row-reverse">
        <b-button class="baseButton" @click="showModalCampaign">
          New Campaign
        </b-button>
        <downloadexcel :data='exportValue' :fields='exportField' type='csv' class="btn export-csv-btn baseButton">
          Export CSV
        </downloadexcel>
      </div>
      <modal-campaign
        :campaign="campaign"
        :modalType="'add'"
        ref="modalCampaign"
      />
    </div>
    <Table
      :fields="columns"
      :list="list"
      :totalItems="totalItems"
      :currentPage="currentPage"
      :perPage="perPage"
      :filter="searchText"
      :searchStart="searchStart"
      :searchEnd="searchEnd"
      @toCSV="toCSV"
      @getList="getList"
    />
  </div>
</template>
<script>
import datetime from "vuejs-datetimepicker";
import downloadexcel from "vue-json-excel";
import ModalCampaign from "../component/modal/ModalCampaign.vue";
import Table from "../component/Table.vue";
import Column from "../constant/table_const";
import { mapGetters, mapActions } from "vuex";
import date from '../mixin/dateFormat.js'
export default {
  name: "Campaign",
  data() {
    return {
      columns: Column.campaign_fields,
      campaign: {
        campaign_name: null,
        campaign_status: 0,
        campaign_budget: 10,
        bid_amount: 1,
        campaign_title: null,
        campaign_description: null,
        campaign_image_url: null,
        campaign_url: null,
        start_time: date.dateNow,
        end_time: date.dateAfterMonth,
      },
      exportValue: {},
      searchText: '',
      searchStart: '',
      searchEnd: '',
      exportField: Column.export_fields
    };
  },
  components: {
    datetime,
    downloadexcel,
    ModalCampaign,
    Table,
  },
  computed: {
    ...mapGetters({
      errorMessage: "CAMPAIGN/errorMessage",
      list: "CAMPAIGN/campaignList",
      currentPage: "CAMPAIGN/currentPage",
      totalItems: "CAMPAIGN/totalCampaign",
      perPage: "CAMPAIGN/perPage",
    }),
  },
  methods: {
    ...mapActions({
      clearErrorMessage: "CAMPAIGN/clearErrorMessage",
    }),
    hideModal(data) {
      this.$refs[data].hide();
    },
    showModalEdit() {
      this.$refs.modalEdit.show();
    },
    getList(page) {
      if (this.searchFlag == 1) {
        this.$store.dispatch("CAMPAIGN/getCampaigns", {
          object: this.searchItem,
          page: page,
        });
        console.log(this.searchItem);
      } else this.$store.dispatch("CAMPAIGN/getCampaigns", page);
    },
    toCSV(value) {
      this.exportValue = value;
    },
    setSearchFlag(data) {
      if (data != "") {
        this.searchFlag = 1;
        this.searchItem = data;
        this.getList(1);
      } else {
        this.searchFlag = 0;
        this.getList(1);
      }
    },
    showModalCampaign() {
      this.$refs.modalCampaign.show();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";

.time-duration {
  margin-bottom: 20px;
  align-items: center;
  ::v-deep .datetime-picker {
    width: 15%;
    .year-month-wrapper {
      background-color: $color;
      button {
        background-color: $color;
      }
    }
    .headers {
      span {
        color: $color;
      }
    }
    .week {
      .port:hover {
        color: $color;
      }
      .activePort {
        background-color: $color;
      }
      .activePort:hover {
        color: white;
      }
    }
    li.active {
      background-color: $color;
    }
    .okButton {
      color: $color;
    }
  }
  div {
    text-align: center;
    justify-content: center;
    margin-right: 5px;
  }
}
.row {
  .addictional-button {
    padding: 0;
    margin: 0;
    b-button {
      margin-right: 12px
    }
    .export-csv-btn {
      margin-right: 30px;
    }
  }
}
input {
  width: 70%;
  background-color: rgb(196, 196, 196);
  border: 0;
  height: 35px;
  padding: 0 5px;
  outline: none;
}
::placeholder {
  font-size: 12px;
  color: black;
}
</style>