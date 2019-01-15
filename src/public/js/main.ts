import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";
// tslint:disable no-unused-expression
new Vue({
  // eslint-disable-line no-new
  computed: {
    hazKeyboards(): boolean {
      // @ts-ignore
      return this.isLoading === false && this.keyboards.length > 0;
    },
    noKeyboards(): boolean {
      // @ts-ignore
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
        // @ts-ignore
        brand: this.brand,
        // @ts-ignore
        color: this.color,
        // @ts-ignore
        model: this.model,
        // @ts-ignore
        year: this.year
      };
      axios
        .post("/api/keyboards/add", keyboard)
        .then(() => {
          // @ts-ignore
          this.$refs.year.focus();
          // @ts-ignore
          this.brand = "";
          // @ts-ignore
          this.color = "";
          // @ts-ignore
          this.model = "";
          // @ts-ignore
          this.year = "";
          // @ts-ignore
          this.loadKeyboards();
        })
        .catch((err: any) => {
          // tslint:disable no-console
          console.log(err); // eslint-disable-line no-console
        });
    },
    confirmDeleteKeyboard(id: string) {
      // @ts-ignore
      const keyboard = this.keyboards.find((k: any) => k.id === id);
      // @ts-ignore
      this.selectedKeyboard = `${keyboard.year} ${keyboard.brand} ${keyboard.model}`;
      // @ts-ignore
      this.selectedKeyboardId = keyboard.id;
      const dc = this.$refs.deleteConfirm;
      // @ts-ignore
      const modal = M.Modal.init(dc);
      // const modal = M.Modal.getInstance( dc );
      modal.open();
    },
    deleteKeyboard(id: string) {
      axios
        .delete(`/api/keyboards/remove/${id}`)
        // @ts-ignore
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
          // @ts-ignore
          this.isLoading = false;
          // @ts-ignore
          this.keyboards = res.data;
        })
        .catch((err: any) => {
          // tslint:disable no-console
          console.log(err); // eslint-disable-line no-console
        });
    }
  },
  mounted() {
    // @ts-ignore
    return this.loadKeyboards();
  }
});
