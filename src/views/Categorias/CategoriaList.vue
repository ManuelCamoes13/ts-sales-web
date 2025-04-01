<template>
  <b-row>
    <h1 class="page-title">
      Lista de <span class="fw-semi-bold">Categoria de produtos</span>
    </h1>
    <b-col lg="12">
      <Widget customHeader>
        <!-- <b-button class="mr-sm" variant="primary" v-b-modal.demo>Demo</b-button> -->
        <b-button-toolbar class="mt-md mb-lg justify-content-start d-print-none">
          <b-button variant="success" v-b-modal.add>
            Adicionar nova &nbsp;
            <span class="circle bg-white">
              <i class="fa fa-plus text-success" />
            </span>
          </b-button>
        </b-button-toolbar>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome da categoria</th>
              <th>Unidade</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(categoria, index) in categorias" :key="index">
              <td>{{ categoria.nome}}</td>
              <td>{{ categoria.unidade}}</td>
              <td><b-badge variant="success">Ativo</b-badge></td>
              <td>
                <b-button-group class="mb-3">
                  <b-button size="xs" variant="primary">
                    <i class="fa fa-eye mr-0 mb-xs" />
                    Ver</b-button
                  >
                  <b-button size="xs" variant="success" v-b-modal.edit>
                    <i class="fa fa-edit mr-0 mb-xs" />
                    Editar</b-button
                  >
                  <b-button size="xs" variant="danger">
                    <i class="fa fa-trash mr-0 mb-xs" />
                    Apagar</b-button
                  >
                </b-button-group>
              </td>
            </tr>
          </tbody>
        </table>
      </Widget>

      <b-modal
        id="edit"
        title="Nova categoria"
        body-class="bg-white"
        cancel-variant="default"
        hide-footer
      >
        <b-form @submit.prevent="handleSubmit">
          <b-form-group
            label="Nome da categoria"
            label-for="search-field"
            breakpoint="md"
          >
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

          <b-form-group label="Unidade" label-for="search-field" breakpoint="md">
            <v-select id="search-select" v-model="unidade" :options="['pcs', 'm']" />

            <span class="text-danger" v-if="errors.has('simple')">
              {{ errors.first("simple") }}
            </span>
          </b-form-group>

          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              class="btn-rounded float-right"
              @click="saveData"
            >
              Salvar
            </b-button>
            <b-button type="button" variant="default" class="btn-rounded">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </b-modal>
      <b-modal
        id="add"
        title="Nova categoria"
        body-class="bg-white"
        cancel-variant="default"
        hide-footer
      >
        <b-form @submit.prevent="handleSubmit">
          <b-form-group
            label="Nome da categoria"
            label-for="search-field"
            breakpoint="md"
          >
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

          <b-form-group label="Unidade" label-for="search-field" breakpoint="md">
            <v-select id="search-select" v-model="unidade" :options="['m', 'pcs']" />

            <span class="text-danger" v-if="errors.has('simple')">
              {{ errors.first("simple") }}
            </span>
          </b-form-group>

          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              class="btn-rounded float-right"
              @click="saveData"
            >
              Salvar
            </b-button>
            <b-button type="button" variant="default" class="btn-rounded">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import http from "../../../http-common.js";
import vSelect from "vue-select";
export default {
  components: { vSelect },
  data() {
    return {
      nome: "",
      unidade: "m",

      categorias: [],
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    saveData() {
      this.$validator.validateAll();
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        nome: this.nome,
        unidade: this.unidade,
      };
      http
        .post("/categorias", data, config)
        .then((result) => {
          this.$swal({
            title: "Sucesso!",
            text: "Operação realizada com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.$bvModal.hide('add');
          this.nome = "";
          this.unidade = "";
          this.getData();
        })
        .catch((error) => {
          this.$swal({
            title: "Erro!",
            text: error.response.data.error,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },

    getData() {
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
