"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const M = __importStar(require("materialize-css"));
const vue_1 = __importDefault(require("vue"));
// tslint:disable-next-line no-unused-expression
new vue_1.default({
    computed: {
        hasKeyboards() {
            return this.isLoading === false && this.keyboards.length > 0;
        },
        noKeyboards() {
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
            axios_1.default
                .post("/api/keyboards/add", keyboard)
                .then(() => {
                this.$refs.year.focus();
                this.brand = "";
                this.color = "";
                this.model = "";
                this.year = "";
                this.loadKeyboards();
            })
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        },
        confirmDeleteKeyboard(id) {
            const keyboard = this.keyboards.find((k) => k.id === id);
            this.selectedKeyboard = `${keyboard.year} ${keyboard.brand} ${keyboard.model}`;
            this.selectedKeyboardId = keyboard.id;
            const dc = this.$refs.deleteConfirm;
            const modal = M.Modal.init(dc);
            modal.open();
        },
        deleteKeyboard(id) {
            axios_1.default
                .delete(`/api/keyboards/remove/${id}`)
                .then(this.loadKeyboards)
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        },
        loadKeyboards() {
            axios_1.default
                .get("/api/keyboards/all")
                .then((res) => {
                this.isLoading = false;
                this.keyboards = res.data;
            })
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        }
    },
    mounted() {
        return this.loadKeyboards();
    }
});
//# sourceMappingURL=main.js.map