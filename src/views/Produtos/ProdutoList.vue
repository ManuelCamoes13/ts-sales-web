<template>
  <b-row>
  <h1 class="page-title">Lista de <span class="fw-semi-bold">Produtos</span></h1>
    <b-col lg="12">
      <Widget customHeader>
        <!-- <b-button class="mr-sm" variant="primary" v-b-modal.demo>Demo</b-button> -->

        <b-row class="mt-md mb-md">
          <b-col lg="3">
              <b-button variant="success" to="/app/produto/add">
                Adicionar novo &nbsp;
                <span class="circle bg-white">
                  <i class="fa fa-plus text-success" />
                </span>
              </b-button>
          </b-col>
          <b-col lg="3">
             <b-form-group
              horizontal
              label="Categoria"
              label-for="search-select"
              :label-cols="4"
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
        </b-row>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome do produto</th>
              <th>Categoria</th>
              <th>Preco</th>
              <th>Quantidade</th>
              <th>Aviso Qtd. minima</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(produto, index) in produtos" :key="index">
              <td>{{ produto.nome }}</td>
              <td>{{ produto.categoria.nome }}</td>
              <td>{{ produto.preco }}.MT</td>
              <td>{{ produto.quantidade }} {{ produto.categoria.unidade }}</td>
              <td>{{ produto.quantidadeMinima }} </td>
              <td><b-badge variant="success">Disponivel</b-badge></td>
              <td>
                <b-button-group class="mb-3">
                <b-button size="xs" variant="primary" v-b-modal.ver>
                <i class="fa fa-eye mr-0 mb-xs" />
                Ver</b-button>
                  <b-button size="xs" variant="success" >
                  <i class="fa fa-edit mr-0 mb-xs" />
                  Editar</b-button>
                  <b-button size="xs" variant="danger">
                  <i class="fa fa-trash mr-0 mb-xs" />
                  Apagar</b-button>
                </b-button-group>
              </td>
            </tr>
          </tbody>
        </table>
      </Widget>

<b-modal
        id="edit"
        title="Detalhes do produto"
        body-class="bg-white"
        cancel-variant="default"
      >
            <b-form >
            <b-row>
              <b-col lg="6">
                <b-form-group
                  horizontal
                  label="Seleccione a categoria"
                  label-for="search-select"
                >
                  <!-- <v-select
                    id="search-select"
                    v-model="selectedCategoria"
                    :options="categorias"
                    label="nome"
                    :reduce="(categoria) => categoria.id"
                  /> -->
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
      </b-modal>
     
      <b-modal
        id="ver"
        title="Detalhes do produto"
        body-class="bg-white"
        cancel-variant="default"
      >
        
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
      produtos: [],
      categorias:[],
    };
  },

  mounted() {
    this.getData();
    this.getCategorias();
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/produtos", config)
        .then((result) => {
          this.produtos = result.data;
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
