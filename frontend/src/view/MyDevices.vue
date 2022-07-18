<template>
  <div>
    <div class="row">
      <!-- modal -->
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

export default {
  name: "MyDevices",
  data() {
    return {
      columns: Column.my_equipment_fields,
      searchText: '',
      searchStart: '',
      searchEnd: '',
    }
  },
  components: {
    Table,
  },
  computed: {
    ...mapGetters({
      list: "MYEQUIPMENT/myEquipments",
      currentPage: "MYEQUIPMENT/currentPage",
      totalItems: "MYEQUIPMENT/totalItems",
      perPage: "MYEQUIPMENT/perPage",
    })
  },
  methods: {
    ...mapActions({
      getList: "MYEQUIPMENT/getEquipments",
    }),
  },
}
</script>