<template>
  <div class="container">
    <appAddComponent :hide="hide"></appAddComponent>
    <div>
      <table class="table text-center table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 15%">Table Name</th>
            <th scope="col" style="width: 25%">Partition Column</th>
            <th scope="col" style="width: 25%">Number Partitions</th>
            <th scope="col" style="width: 15%">Is Partitioned</th>
            <th scope="col" style="width: 20%">Edit</th>
          </tr>
        </thead>
        <tbody v-for="(value,key) in tables" :key="key">
          <tr v-show="hide[0] !== key">
            <th scope="row">{{key}}</th>
            <td>{{value.partitionColumn}}</td>
            <td>{{value.numPartitions}}</td>
            <td>{{value.partitioned}}</td>
            <td>
              <button
                :disabled="hide.length>0"
                type="button"
                class="btn btn-primary"
                @click="edit(value,key)"
              >Edit</button>
            </td>
          </tr>
          <appEditComponent :id="key" :data="value" :hideId="hide[0]"></appEditComponent>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditComponent from "./EditComponent.vue";
import AddComponent from "./AddComponent.vue";
import { AppBus } from "../utils";
import { baseUrl } from "../utils";
export default {
  data() {
    return {
      tables: [],
      hide: [],
      choosedItem: []
    };
  },
  methods: {
    edit(value, id) {
      this.hide = [id];
      this.choosedItem = [id, value];
    },
    cancel() {
      this.getData();
    },
    getData() {
      axios
        .get(`${baseUrl}/table`)
        .then(r => {
          this.choosedItem = [];
          this.hide = [];
          this.tables = r.data;
        })
        .catch(e => console.log(e));
    },
    editData(id, data) {
      axios
        .put(`${baseUrl}/table/${id}`, data)
        .then(() => this.getData())
        .catch(e => console.log(e));
    },
    deleteData(id) {
      axios
        .delete(`${baseUrl}/table/${id}`)
        .then(() => this.getData())
        .catch(e => console.log(e));
    }
  },
  created() {
    this.getData();
    AppBus.$on("canceled", this.cancel);
    AppBus.$on("save", this.editData);
    AppBus.$on("delete", this.deleteData);
    AppBus.$on("addData", this.getData);
  },
  components: {
    appEditComponent: EditComponent,
    appAddComponent: AddComponent
  }
};
</script>
