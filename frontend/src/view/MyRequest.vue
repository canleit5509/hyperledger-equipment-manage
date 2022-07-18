<template>
  <div>
    <div class="row">
      <div class="col-sm-6"> 
        <input v-model="searchText" placeholder="Search..."/>
      </div>
      <div class="additional-button col-sm-6 d-flex flex-row-reverse">
        <b-button class="button-modal baseButton"  @click="showModalEdit">
          Create Request
        </b-button>
        <modal-request ref="modalRequest" />
      </div>
    </div>
    <div class="content">
      <Table
      :ref="user"
      :list="list"
      :fields="fields"
      :totalItems="totalItems"
      :currentPage="currentPage"
      :perPage="perPage"
      :filter="searchText"
      @getList="getList"
    />
    </div>
  </div>
</template>

<script>
import Table from "../component/Table.vue";
import ModalRequest from "../component/modal/ModalRequest.vue";
import Column from "../constant/table_const";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MyRequest",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("token"),
      fields: Column.my_request_fields,
      searchText: ''
    };
  },
  components: {
    Table,
    ModalRequest,
  },
  computed: {
    ...mapGetters({
      list: "MYREQUEST/myRequests",
      currentPage: "MYREQUEST/currentPage",
      totalItems: "MYREQUEST/totalItems",
      perPage: "MYREQUEST/perPage",
    }),
  },
  methods: {
    ...mapActions({
      clearErrorMessage: "MYREQUEST/clearErrorMessage",
      getListUser: "MYREQUEST/getRequests"
    }),
    showModalEdit() {
      this.$refs.modalRequest.show()
    },
    getList(page) {
      this.getListUser(page);
    },
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
input {
  width: 70%;
  background-color: rgb(196,196,196);
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