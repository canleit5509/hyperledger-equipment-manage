<template>
  <div>
    <div class="row">
       <div class="col-sm-6"> 
        <input v-model="searchText" placeholder="Search equipment name ..."/>
      </div>
      <div class="   d-flex flex-row-reverse">
        <b-button variant="primary" @click="showModalEdit">
          Create new Equipment
        </b-button>
        <modal-equipment ref="modalEquipment" />
      </div>
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
      @getList="getList"
      />
  </div>
</template>

<script>
import Table from "../component/Table.vue";
import Column from "../constant/table_const";
import { mapGetters, mapActions } from "vuex";
import ModalEquipment from "../component/modal/ModalEquipment.vue";


export default {
  name: "EquipmentManage",
  data() {
    return {
      columns: Column.equipment_fields,
      searchText: '',
      searchStart: '',
      searchEnd: '',
    }
  },
  components: {
    Table,
    ModalEquipment
  },
  computed: {
    ...mapGetters({
      list: "EQUIPMENT/equipments",
      currentPage: "EQUIPMENT/currentPage",
      totalItems: "EQUIPMENT/totalItems",
      perPage: "EQUIPMENT/perPage",
    })
  },
  methods: {
    ...mapActions({
      getList: "EQUIPMENT/getEquipments",
      getAvailable: "EQUIPMENT/getAvailableEquipment",
    }),
    showModalEdit() {
      this.getAvailable();
      this.$refs.modalEquipment.show()
    },
  },
}
</script>