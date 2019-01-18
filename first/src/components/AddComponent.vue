<template>
  <div>
    <button
      style="position: fixed; top: 0; left: 0"
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      :disabled="hide.length > 0"
      data-target="#exampleModalCenter"
    >Add New Table</button>
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">New Table</h5>
          </div>
          <div class="modal-body">
            <div>
              <form>
                <div class="form-group">
                  <label>Table Name</label>
                  <input
                    type="text"
                    v-model="id"
                    class="form-control"
                    :class="{myInputDanger: !id}"
                  >
                  <div
                    v-show="!id"
                    class="form-control-feedback myTextDanger"
                  >This field is required!</div>
                </div>
                <div class="form-group">
                  <label>Partition Column</label>
                  <input
                    type="text"
                    v-model="partitionColumn"
                    class="form-control"
                    :disabled="!partitioned"
                    :class="{myInputDanger: !partitionColumn && partitioned}"
                  >
                  <div
                    v-show="!partitionColumn && partitioned"
                    class="form-control-feedback myTextDanger"
                  >This field is required!</div>
                </div>
                <div class="form-group">
                  <label>Number Partitions</label>
                  <input
                    type="number"
                    v-model="numPartitions"
                    class="form-control"
                    :disabled="!partitioned"
                    :class="{myInputDanger: !numPartitions && partitioned}"
                  >
                  <div
                    v-show="!numPartitions && partitioned"
                    class="form-control-feedback myTextDanger"
                  >This field is required!</div>
                </div>
                <div class="form-group form-check">
                  <input type="checkbox" v-model="partitioned" class="form-check-input">
                  <label class="form-check-label">Partitioned</label>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              :data-dismiss="checkDataDismiss() && 'modal'"
              @click="addData"
              class="btn btn-primary"
            >Add</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="onCloseModal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AppBus } from "../utils";
import { baseUrl } from "../utils";
export default {
  props: {
    hide: Array
  },
  data() {
    return {
      id: null,
      partitionColumn: null,
      numPartitions: null,
      partitioned: false
    };
  },
  methods: {
    addData() {
      const data = {
        partitionColumn: this.partitionColumn,
        numPartitions: this.numPartitions,
        partitioned: this.partitioned
      };
      if (!data.partitioned && this.id) {
        data.partitionColumn = null;
        data.numPartitions = null;
        axios
          .put(`${baseUrl}/table/${this.id}`, data)
          .then(() => {
            AppBus.$emit("addData");
            this.clearFormData();
          })
          .catch(e => console.log(e));
      } else if (
        data.partitioned &&
        data.partitionColumn &&
        data.numPartitions &&
        this.id
      ) {
        axios
          .put(`${baseUrl}/table/${this.id}`, data)
          .then(() => {
            AppBus.$emit("addData");
            this.clearFormData();
          })
          .catch(e => console.log(e));
      } else return;
    },
    onCloseModal() {
      this.clearFormData();
    },
    checkDataDismiss() {
      if (
        (this.id && !this.partitioned) ||
        (this.id &&
          this.partitioned &&
          this.partitionColumn &&
          this.numPartitions)
      ) {
        return true;
      } else return false;
    },
    clearFormData() {
      this.partitionColumn = null;
      this.numPartitions = null;
      this.partitioned = false;
      this.id = null;
    }
  }
};
</script>

<style scoped>
.myInputDanger {
  border: 2px solid red;
}
.myTextDanger {
  color: red;
  margin-top: 5px;
}
</style>
