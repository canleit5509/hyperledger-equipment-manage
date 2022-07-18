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
        <modal-user :userInfo="userInfo" :modalType="'add'" ref="modalUser" />
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
import ModalUser from "../component/modal/ModalUser.vue";
import Column from "../constant/table_const";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "RequestList",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("token"),
      fields: Column.request_fields,
      searchText: ''
    };
  },
  components: {
    Table,
    ModalUser,
  },
  computed: {
    ...mapGetters({
      errorMessage: "REQUEST/errorMessage",
      list: "REQUEST/requests",
      currentPage: "REQUEST/currentPage",
      totalItems: "REQUEST/totalItems",
      perPage: "REQUEST/perPage",
    }),
  },
  methods: {
    ...mapActions({
      clearErrorMessage: "REQUEST/clearErrorMessage",
      getRequests: "REQUEST/getRequests"
    }),
    showModalEdit() {
      this.$refs.modalUser.show()
    },
    getList(page) {
      this.getRequests(page);
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