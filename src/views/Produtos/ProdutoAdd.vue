<template>
  <div>
    <h1 class="page-title">Novo <span class="fw-semi-bold">Produto</span></h1>

    <b-row>
      <b-col lg="12" xs="12">
        <Widget>
          <b-form >
            <b-row>
              <b-col lg="6">
                <b-form-group
                  horizontal
                  label="Seleccione a categoria"
                  label-for="search-select"
                >
                  <v-select
                    id="search-select"
                    v-model="selectedCategoria"
                    :options="categorias"
                    label="nome"
                    :reduce="(categoria) => categoria.id"
                  />
                </b-form-group>
              </b-col>

              <b-col lg="6">
                <b-form-group label="Nome " label-breakpoint="md" label-for="basic">
                  <input
                    v-validate="'required'"
                    name="simple"
                    :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
                    type="text"
                    id="basic"
                    v-model="nome"
                  />
                  <span class="text-danger" v-if="errors.has('simple')">
                    {{ errors.first("simple") }}
                  </span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group
              label="Descricao do produto "
              label-breakpoint="md"
              label-for="basic"
            >
              <input
                v-validate="'required'"
                name="simple"
                :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
                type="text"
                id="basic"
                v-model="descricao"
              />
              <span class="text-danger" v-if="errors.has('simple')">
                {{ errors.first("simple") }}
              </span>
            </b-form-group>

            <b-row>
              <b-col lg="6">
                <b-form-group
                  horizontal
                  label="Preco"
                  label-breakpoint="md"
                  label-for="number"
                >
                  <input
                    v-validate="'required|numeric'"
                    name="number"
                    :class="{ 'form-control': true, 'is-invalid': errors.has('number') }"
                    type="number"
                    id="number"
                    v-model="preco"
                  />
                  <span class="text-danger" v-if="errors.has('number')">
                    {{ errors.first("number") }}
                  </span>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  horizontal
                  label="Quantidade de stock"
                  label-breakpoint="md"
                  label-for="number"
                >
                  <input
                    v-validate="'required|numeric'"
                    name="number"
                    :class="{ 'form-control': true, 'is-invalid': errors.has('number') }"
                    type="number"
                    id="number"
                    v-model="quantidade"
                  />
                  <span class="text-danger" v-if="errors.has('number')">
                    {{ errors.first("number") }}
                  </span>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="6">
                <b-form-group
                  horizontal
                  label="Alerta de stock baixo"
                  label-breakpoint="md"
                  label-for="number"
                >
                  <input
                    v-validate="'required|numeric'"
                    name="number"
                    :class="{ 'form-control': true, 'is-invalid': errors.has('number') }"
                    type="number"
                    id="number"
                    v-model="quantidade_de_stock_baixo"
                  />
                  <span class="text-danger" v-if="errors.has('number')">
                    {{ errors.first("number") }}
                  </span>
                </b-form-group>
              </b-col>
              <!-- <b-col lg="6">
                <b-form-group
                  horizontal
                  label="Foto"
                  label-breakpoint="md"
                  label-for="number"
                >
                  <input
                    name="number"
                    :class="{ 'form-control': true, 'is-invalid': errors.has('number') }"
                    type="file"
                    id="number"
                  />
                  <span class="text-danger" v-if="errors.has('number')">
                    {{ errors.first("number") }}
                  </span>
                </b-form-group>
              </b-col> -->
            </b-row>

            <div class="form-action bg-transparent px-0">
              <b-button type="submit" variant="success" class="btn-rounded float-right" @click="onSubmit">
                Salvar
              </b-button>
              <b-button type="button" variant="default" class="btn-rounded" to="/app/produto/list">
                Cancel
              </b-button>
            </div>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import vSelect from "vue-select";
import http from "../../../http-common.js";

export default {
  name: "FormValidation",
  components: { Widget, vSelect },
  data() {
    return {
      name: "",
      selectedCategoria: "",
      nome: "",
      descricao: "",
      notas: "",
      preco: "",
      quantidade: "",
      quantidade_de_stock_baixo: "",
      imagem: "",
      categorias: [],
    };
  },

  mounted() {
    this.getCategorias();
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.saveData();
        } else {
        }
      });
    },

    saveData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        nome: this.nome,
        categoria_id: this.selectedCategoria.id,
        descricao: this.descricao,
        notas: this.notas,
        preco: this.preco,
        quantidade: this.quantidade,
        quantidade_de_stock_baixo: this.quantidade_de_stock_baixo,
      };
      http
        .post("/produtos", data, config)
        .then((result) => {
          this.$swal({
            title: "Sucesso!",
            text: "Operação realizada com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.$router.push({ name: 'Produto-list' });
        })
        .catch((error) => {});
    },

    getCategorias() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/categorias", config)
        .then((result) => {
          this.categorias = result.data;
        })
        .catch((error) => {});
    },
  },
};
</script>
