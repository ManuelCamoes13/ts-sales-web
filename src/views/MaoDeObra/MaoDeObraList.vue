<template>
  <b-row>
  <h1 class="page-title">Lista de <span class="fw-semi-bold">Mãos-de-obra</span></h1>
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
              <th>Mão-de-obra</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(maoDeObra, index) in maosDeobra" :key="index">
            
              <td>{{ maoDeObra.nome }}</td>
              <td>{{ maoDeObra.preco }}.MT</td>
              <td><b-badge variant="success">{{ maoDeObra.categoria.nome }}</b-badge></td>
              <td>
                <b-button-group class="mb-3">
                  
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
        title="Editar mao de obra"
        body-class="bg-white"
        cancel-variant="default"
       hide-footer
      >
        <b-form @submit.prevent="handleSubmit">
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
           <b-form-group
             <b-form-group
              label="Nome da Mão-de-obra"
              label-breakpoint="md"
              label-for="basic"
            >
              <input
                v-validate="'required'"
                name="nome"
                :class="{ 'form-control': true, 'is-invalid': errors.has('nome') }"
                type="text"
                id="nome"
                v-model="nome"
              />
              <span class="text-danger" v-if="errors.has('nome')">
                {{ errors.first("nome") }}
              </span>
            </b-form-group>
             <b-form-group
              label="Preco "
              label-breakpoint="md"
              label-for="basic"
            >
              <input
                v-validate="'required|numeric'"
                name="simple"
                :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
                type="number"
                id="basic"
                v-model="preco"
              />
              <span class="text-danger" v-if="errors.has('simple')">
                {{ errors.first("simple") }}
              </span>
            </b-form-group>

          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              class="btn-rounded float-right"
              @click="onSubmit"
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
           <b-form-group
             <b-form-group
              label="Nome da Mão-de-obra"
              label-breakpoint="md"
              label-for="basic"
            >
              <input
                v-validate="'required'"
                name="nome"
                :class="{ 'form-control': true, 'is-invalid': errors.has('nome') }"
                type="text"
                id="nome"
                v-model="nome"
              />
              <span class="text-danger" v-if="errors.has('nome')">
                {{ errors.first("nome") }}
              </span>
            </b-form-group>
             <b-form-group
              label="Preco "
              label-breakpoint="md"
              label-for="basic"
            >
              <input
                v-validate="'required|numeric'"
                name="simple"
                :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
                type="number"
                id="basic"
                v-model="preco"
              />
              <span class="text-danger" v-if="errors.has('simple')">
                {{ errors.first("simple") }}
              </span>
            </b-form-group>

          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              class="btn-rounded float-right"
              @click="onSubmit"
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
      preco: "",
      maosDeobra: [],
      categorias:[],
      selectedCategoria:[]
    };
  },

  mounted() {
    this.getData();
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
        categoria_id:this.selectedCategoria.id,
        nome: this.nome,
        preco: this.preco,
      };
      http
        .post("/mao_de_obra", data, config)
        .then((result) => {
           this.$bvModal.hide('add');
          this.$swal({
            title: "Sucesso!",
            text: "Operação realizada com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.nome="",
          this.preco="",
        
          this.getData()
        })
        .catch((error) => {
          this.$swal({
            title: "Erro!",
            text: "Erro ao processar!",
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
        .get("/mao_de_obra", config)
        .then((result) => {
          this.maosDeobra = result.data;
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
        .get("/categorias_mao_de_obra", config)
        .then((result) => {
          this.categorias = result.data;
        })
        .catch((error) => {});
    },
  },
};
</script>
