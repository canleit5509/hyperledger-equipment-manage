<template>
  <b-modal
    id="modalCampaign"
    ref="modalCampaign"
    hide-footer
    size="lg md"
    class="col-lg-6"
    title="Campaign"
    hide-header-close
  >
    <div class="errorMessage">
      <error-message />
    </div>
    <form>
      <div class="details group">
        <div class="header">
          <span>Details</span>
          <span @click="isShowDetail = !isShowDetail">
            <i class="bx bxs-chevron-down"></i>
          </span>
        </div>
        <div v-show="isShowDetail" class="content">
          <div class="form-group">
            <label for="">Name: </label>
            <input type="text" v-model="campaign.campaign_name" />
            <div class="errors">
              <p class="error" v-show="showErrors.emptyName">
                Campaign name is required
              </p>
              <p class="error" v-show="showErrors.campaignNameMaxLength">
                Campaign must have at most 255 letters
              </p>
            </div>
          </div>
          <div class="form-group">
            <label for="">Status: </label>
            <select v-model="campaign.campaign_status" id="campaign_status">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div class="schedule group">
        <div class="header">
          <span>Schedule</span>
          <span @click="isShowSchedule = !isShowSchedule"
            ><i class="bx bxs-chevron-down"></i
          ></span>
        </div>
        <div v-show="isShowSchedule" class="">
          <div>
            <div class="start">
              <div class="label">Start Time:</div>
              <b-form-datepicker
                class="date"
                v-model="startDate"
              ></b-form-datepicker>
              <b-form-timepicker
                v-model="startTime"
                class="time"
                show-seconds
                h23
              />
            </div>
            <div class="end">
              <div class="label">End Time:</div>
              <b-form-datepicker
                class="date"
                v-model="endDate"
                :min="startDate"
              ></b-form-datepicker>
              <b-form-timepicker
                h23
                v-model="endTime"
                class="time"
                show-seconds
              />
            </div>
          </div>
          <div class="errors">
            <p class="error" v-show="showErrors.endLessThanStart">
              Start date must be less than end date
            </p>
          </div>
        </div>
      </div>
      <div class="budget group">
        <div class="header">
          <span>Budget</span>
          <span @click="isShowBudget = !isShowBudget"
            ><i class="bx bxs-chevron-down"></i
          ></span>
        </div>
        <div v-show="isShowBudget" class="form-group">
          <label for="">Budget: </label>
          <input
            class="form-control"
            type="number"
            v-model="campaign.campaign_budget"
            onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
          />
          <div class="errors">
            <p class="error" v-show="showErrors.emptyCampaignBudget">
              CampaignBudget is required
            </p>
            <p class="error" v-show="showErrors.campaignBudgetMin">
              Campaign must have at least 1
            </p>
          </div>
        </div>
      </div>
      <div class="bidding group">
        <div class="header">
          <span>Bidding</span>
          <span @click="isShowBidding = !isShowBidding"
            ><i class="bx bxs-chevron-down"></i
          ></span>
        </div>
        <div v-show="isShowBidding" class="form-group">
          <label for="">Bid Amount: </label>
          <input
            class="form-control"
            type="number"
            onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
            v-model="campaign.bid_amount"
            :max="campaign.campaign_budget"
            min="0"
          />
          <div class="errors">
            <p class="error" v-show="showErrors.emptyBidAmount">
              Bid Amount is required
            </p>
            <p class="error" v-show="showErrors.budgetLessThanBidAmount">
              Bid amount must be less than budget
            </p>
            <p class="error" v-show="showErrors.campaignBidAmountMin">
              Campaign must have at least 1
            </p>
          </div>
        </div>
      </div>
      <div class="creative group">
        <div class="header">
          <span>Creative</span>
          <span @click="isShowCreative = !isShowCreative"
            ><i class="bx bxs-chevron-down"></i
          ></span>
        </div>
        <div v-show="isShowCreative" class="content">
          <div class="form-group">
            <label for="">Title: </label>
            <input
              class="form-control"
              type="text"
              v-model.trim="campaign.campaign_title"
            />
            <div class="errors">
              <p class="error" v-show="showErrors.emptyCampaignTitle">
                Title is requied
              </p>
            </div>
          </div>
          <div class="form-group">
            <label for="">Description: </label>
            <input
              class="form-control"
              type="text"
              v-model.trim="campaign.campaign_description"
            />
            <div class="errors">
              <p class="error" v-show="showErrors.emptyCampaignDescription">
                Campaign description is requied
              </p>
            </div>
          </div>
          <div class="form-group">
            <label for="">Creative preview: </label>
            <div class="image-upload-preview" @click="handleUpload">
              <input
                type="file"
                accept="image/*"
                @change="onFileChange"
                style="display: none; background-color: red"
                ref="uploadInput"
              />
              <img :src="campaign.campaign_image_url" alt="" />
              <div
                class="errors"
                style="
                  margin-top: 180px;
                  margin-bottom: 20px;
                  margin-left: -48%;
                "
              >
                <p class="error" v-show="showErrors.emptyCampaignImageUrl">
                  Campaign image is requied
                </p>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="">Final URL: </label>
            <input
              class="form-control"
              type="text"
              v-model.trim="campaign.campaign_url"
            />
            <div class="errors">
              <p class="error" v-show="showErrors.emptyCampaignUrl">
                Campaign url is requied
              </p>
              <p class="error" v-show="showErrors.invalidUrl">
                The campaign url format is invalid
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="d-flex flex-row-reverse">
      <b-button
        class="okButton"
        :disabled="isDisableButton"
        block
        @click="addCampaign"
        >Save</b-button
      >
      <b-button
        class="cancelButton"
        block
        style="margin-right: 20px"
        @click="hideModal(campaign.id)"
        >Close</b-button
      >
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import ErrorMessage from "../ErrorMessage.vue";
import date from '../../mixin/dateFormat.js'

export default {
  name: "ModalCampaign",
  data() {
    return {
      isShowDetail: true,
      isShowSchedule: true,
      isShowBudget: true,
      isShowBidding: true,
      isShowCreative: true,
      isDisableButton: false,
      isDateNull: null,
      startDate: this.campaign.start_time.split(" ")[0],
      startTime: this.campaign.start_time.split(" ")[1],
      endDate: this.campaign.end_time.split(" ")[0],
      endTime: this.campaign.end_time.split(" ")[1],
      showErrors: {},
    };
  },
  props: ["campaign", "modalType", "start"],
  computed: {
    ...mapGetters({
      errorMessage: "ERROR/errorMessage",
      validateCampaign: "VALIDATION/validateCampaign",
    }),
  },
  components: {
    ErrorMessage,
  },
  methods: {
    ...mapActions({
      clearErrorMessage: "ERROR/clearErrorMessage",
      createCampaign: "CAMPAIGN/createCampaign",
      updateCampaign: "CAMPAIGN/updateCampaign",
    }),

    show() {
      this.$refs.modalCampaign.show();
      this.clearErrorMessage();
    },
    addCampaign() {
      this.campaign.start_time = `${this.startDate} ${this.startTime}`;
      this.campaign.end_time = `${this.endDate} ${this.endTime}`;
      this.campaign.bid_amount = parseFloat(this.campaign.bid_amount);
      this.campaign.campaign_budget = parseFloat(this.campaign.campaign_budget);
      this.isDisableButton = true;
      if (!this.validateBeforeSubmit()) {
        return;
      } else {
        console.log(this.campaign);
        if (this.modalType === "add") {
          this.createCampaign(this.campaign).then(() => {
            if (!this.errorMessage) {
              this.$refs.modalCampaign.hide();
            }
          });
        } else {
          this.updateCampaign(this.campaign).then(() => {
            if (!this.errorMessage) {
              this.$refs.modalCampaign.hide();
            }
          });
        }
      }
    },
    onFileChange(e) {
      this.isDisableButton = true;
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "wfcqkljk");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dj5xafymg/image/upload",
          formData
        )
        .then((response) => {
          this.campaign.campaign_image_url = response.data.url;
          this.isDisableButton = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateCampaign(
        this.campaign,
        this.startDate,
        this.startTime,
        this.endDate,
        this.endTime
      );
      console.log(errors);
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyName",
          this.showErrors && !!errors && errors.emptyName
        );
        Vue.set(
          this.showErrors,
          "campaignNameMaxLength",
          this.showErrors && !!errors && errors.campaignNameMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyCampaignBudget",
          this.showErrors && !!errors && errors.emptyCampaignBudget
        );
        Vue.set(
          this.showErrors,
          "campaignBudgetMin",
          this.showErrors && !!errors && errors.campaignBudgetMin
        );
        Vue.set(
          this.showErrors,
          "emptyBidAmount",
          this.showErrors && !!errors && errors.emptyBidAmount
        );
        Vue.set(
          this.showErrors,
          "campaignBidAmountMin",
          this.showErrors && !!errors && errors.campaignBidAmountMin
        );
        Vue.set(
          this.showErrors,
          "budgetLessThanBidAmount",
          this.showErrors && !!errors && errors.budgetLessThanBidAmount
        );
        Vue.set(
          this.showErrors,
          "emptyCampaignTitle",
          this.showErrors && !!errors && errors.emptyCampaignTitle
        );
        Vue.set(
          this.showErrors,
          "campaignTitleMaxLength",
          this.showErrors && !!errors && errors.campaignTitleMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyCampaignDescription",
          this.showErrors && !!errors && errors.emptyCampaignDescription
        );
        Vue.set(
          this.showErrors,
          "campaignDescriptionMaxLength",
          this.showErrors && !!errors && errors.campaignDescriptionMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyCampaignUrl",
          this.showErrors && !!errors && errors.emptyCampaignUrl
        );
        Vue.set(
          this.showErrors,
          "invalidUrl",
          this.showErrors && !!errors && errors.invalidUrl
        );
        Vue.set(
          this.showErrors,
          "emptyCampaignImageUrl",
          this.showErrors && !!errors && errors.emptyCampaignImageUrl
        );
        Vue.set(
          this.showErrors,
          "endLessThanStart",
          this.showErrors && !!errors && errors.endLessThanStart
        );
        passedValidate = false;
      }
      return passedValidate;
    },
    handleUpload() {
      this.$refs.uploadInput.click();
    },
    hideModal(id) {
      this.resetCampaign(id);
      this.$refs["modalCampaign"].hide();
    },
    resetCampaign(id) {
      if (id) {
        let listCampaign = JSON.parse(localStorage.getItem("listCampaign"));
        for (let i = 0; i < listCampaign.length; i++) {
          if (id == listCampaign[i].id) {
            let oldCamp = listCampaign[i];
            this.campaign.campaign_name = oldCamp.campaign_name;
            this.campaign.bid_amount = oldCamp.bid_amount;
            this.campaign.campaign_budget = oldCamp.campaign_budget;
            this.campaign.campaign_description = oldCamp.campaign_description;
            this.campaign.campaign_image_url = oldCamp.campaign_image_url;
            this.campaign.campaign_status = oldCamp.campaign_status;
            this.campaign.campaign_title = oldCamp.campaign_title;
            this.campaign.campaign_url = oldCamp.campaign_url;
            this.campaign.start_time = oldCamp.start_time;
            this.campaign.end_time = oldCamp.end_time

            break;
          }
        }
      } else {
        this.campaign.campaign_name = null
        this.campaign.bid_amount = 1
        this.campaign.campaign_budget = 10
        this.campaign.campaign_description = null
        this.campaign.campaign_image_url = null
        this.campaign.campaign_status = null
        this.campaign.campaign_title = null
        this.campaign.campaign_url = null
        this.campaign.start_time = date.dateNow
        this.campaign.end_time = date.dateAfterMonth
      }
    },
  },
  watch: {
    "campaign.campaign_name"() {
      Vue.set(this.showErrors, "emptyName", null);
      Vue.set(this.showErrors, "campaignNameMaxLength", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "campaign.campaign_budget"() {
      Vue.set(this.showErrors, "emptyCampaignBudget", null);
      Vue.set(this.showErrors, "campaignBudgetMin", null);
      Vue.set(this.showErrors, "budgetLessThanBidAmount", null);
      this.clearErrorMessage();
      this.isDisableButton = false;
    },
    "campaign.bid_amount"() {
      Vue.set(this.showErrors, "emptyBidAmount", null);
      Vue.set(this.showErrors, "budgetLessThanBidAmount", null);
      Vue.set(this.showErrors, "campaignBidAmountMin", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "campaign.campaign_title"() {
      Vue.set(this.showErrors, "emptyCampaignTitle", null);
      Vue.set(this.showErrors, "campaignTitleMaxLength", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "campaign.campaign_description"() {
      Vue.set(this.showErrors, "emptyCampaignDescription", null);
      Vue.set(this.showErrors, "campaignDescriptionMaxLength", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "campaign.campaign_url"() {
      Vue.set(this.showErrors, "emptyCampaignUrl", null);
      Vue.set(this.showErrors, "invalidUrl", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "campaign.campaign_image_url"() {
      Vue.set(this.showErrors, "emptyCampaignImageUrl", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    startDate() {
      Vue.set(this.showErrors, "endLessThanStart", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    startTime() {
      Vue.set(this.showErrors, "endLessThanStart", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    endDate() {
      Vue.set(this.showErrors, "endLessThanStart", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    endTime() {
      Vue.set(this.showErrors, "endLessThanStart", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
  },

  async created() {
    if (this.modalType == "edit") {
      this.isDisableButton = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";

.header {
  background-color: $color;
  padding: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 10px 0;
  color: white;
  display: flex;
  justify-content: space-between;
}
::v-deep .close {
  border: none;
  background: none;
  font-size: 25px;
}
::v-deep .modal-body {
  padding-right: 0;
  form {
    width: 95%;
    margin: 0 0 10px auto;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 70vh;
    padding-right: 30px;
    .group {
      background-color: rgb(250, 246, 246);
      border-radius: 5px;
      padding-bottom: 5px;
      margin-bottom: 15px;
      .form-group {
        display: flex;
        flex-wrap: wrap;
        margin: 25px 0 0;
        label {
          flex-basis: 25%;
          text-align: right;
          margin-right: 2em;
          align-items: center;
        }
        input,
        select {
          flex-basis: 68%;
          border: 1px solid grey;
          border-radius: 5px;
          padding: 4px;
        }
        .image-upload-preview {
          flex-basis: 68%;
          height: 200px;
          margin-bottom: 20px;
          text-align: center;
          border: 1px solid rgb(121, 118, 118);
          img {
            width: 400px;
            height: 100%;
          }
        }
      }
    }
  }
  .d-flex {
    margin-right: 47px;
  }
}
.start,
.end {
  display: flex;
  justify-content: space-between;
  margin-right: 25px;
  .label {
    margin-left: 15%;
    flex-basis: 15%;
  }
  .date {
    flex-basis: 35%;
  }
  .time {
    flex-basis: 35%;
  }
}
</style>