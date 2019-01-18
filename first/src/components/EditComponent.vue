<template>
  <tr v-show="hideId === id">
    <th scope="row">{{id}}</th>
    <td>
      <input
        :disabled="!data.partitioned"
        type="text"
        v-model="data.partitionColumn"
        placeholder="Partition Column"
        class="form-control"
        :class="{myInputDanger: !data.partitionColumn && data.partitioned}"
      >
      <div
        v-show="!data.partitionColumn && data.partitioned"
        class="form-control-feedback myTextDanger"
      >This field is required!</div>
    </td>
    <td>
      <input
        :disabled="!data.partitioned"
        type="number"
        v-model="data.numPartitions"
        placeholder="Number Partitions"
        class="form-control"
        :class="{myInputDanger: !data.numPartitions && data.partitioned}"
      >
      <div
        v-show="!data.numPartitions && data.partitioned"
        class="form-control-feedback myTextDanger"
      >This field is required!</div>
    </td>
    <td>
      <label>
        <input v-model="data.partitioned" class="form-check-input" type="checkbox">
        Partitioned
      </label>
    </td>
    <td>
      <button type="button" class="btn btn-success btn-sm" @click="onSave(id,data)">Save</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="onCancel">Cancel</button>
      <button type="button" class="btn btn-danger btn-sm" @click="onDelete(id)">Delete</button>
    </td>
  </tr>
</template>

<script>
import { AppBus } from "../utils";
export default {
  props: {
    hideId: String,
    id: String,
    data: Object
  },
  methods: {
    onCancel() {
      AppBus.$emit("canceled");
    },
    onSave(id, data) {
      if (!data.partitioned) {
        data.partitionColumn = null;
        data.numPartitions = null;
        AppBus.$emit("save", id, data);
      } else if (
        data.partitioned &&
        data.partitionColumn &&
        data.numPartitions
      ) {
        AppBus.$emit("save", id, data);
      } else return;
    },
    onDelete(id) {
      AppBus.$emit("delete", id);
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
