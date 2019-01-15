import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";

// tslint:disable no-unused-expression
new Vue({
  // eslint-disable-line no-new
  computed: {
    hazKeyboards(): boolean {
      return this.isLoading === false && this.keyboards.length > 0;
    },
    noKeyboards(): boolean {
      return this.isLoading === false && this.keyboards.length === 0;
    }
  },
  data() {
    return {
      brand: "",
      color: "",
      isLoading: true,
      keyboards: [],
      model: "",
      selectedKeyboard: "",
      selectedKeyboardId: 0,
      year: ""
    };
  },
  el: "#app",
  methods: {
    addKeyboard() {
      const keyboard = {
        brand: this.brand,
        color: this.color,
        model: this.model,
        year: this.year
      };
      axios
        .post("/api/keyboards/add", keyboard)
        .then(() => {
          this.$refs.year.focus();
          this.brand = "";
          this.color = "";
          this.model = "";
          this.year = "";
          this.loadKeyboards();
        })
        .catch((err: any) => {
          // tslint:disable no-console
          console.log(err); // eslint-disable-line no-console
        });
    },
    confirmDeleteKeyboard(id: string) {
      const keyboard = this.keyboards.find((k: any) => k.id === id);
      this.selectedKeyboard = `${keyboard.year} ${keyboard.brand} ${keyboard.model}`;
      this.selectedKeyboardId = keyboard.id;
      const dc = this.$refs.deleteConfirm;
      const modal = M.Modal.init(dc);
      // const modal = M.Modal.getInstance( dc );
      modal.open();
    },
    deleteKeyboard(id: string) {
      axios
        .delete(`/api/keyboards/remove/${id}`)
        .then(this.loadKeyboards)
        .catch((err: any) => {
          // tslint:disable no-console
          console.log(err); // eslint-disable-line no-console
        });
    },
    loadKeyboards() {
      axios
        .get("/api/keyboards/all")
        .then((res: any) => {
          this.isLoading = false;
          this.keyboards = res.data;
        })
        .catch((err: any) => {
          // tslint:disable no-console
          console.log(err); // eslint-disable-line no-console
        });
    }
  },
  mounted() {
    return this.loadKeyboards();
  }
});
