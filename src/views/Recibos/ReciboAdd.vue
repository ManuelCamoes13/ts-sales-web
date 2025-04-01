<template>
  <div>
    <h1 class="page-title">Emitir <span class="fw-semi-bold">Recibo</span></h1>

    <b-row>
      <b-col lg="12" xs="12">
        <Widget>
          <b-form>
            <b-row>
              <b-col lg="6">
                <label>Forma de pagamento</label>
                <b-form-group class="radio abc-radio">
                  <input
                    type="radio"
                    name="radio1"
                    id="radio-small"
                    v-model="formaPagamento"
                    value="numerario"
                  />
                  <label for="radio-small">Numerario</label>
                </b-form-group>

                <b-form-group class="radio abc-radio">
                  <input
                    type="radio"
                    name="radio1"
                    id="radio-big"
                    v-model="formaPagamento"
                    value="cheque"
                  />
                  <label for="radio-big">Cheque</label>
                </b-form-group>
              </b-col>

              <b-col lg="6">
                <b-form-group
                  v-if="formaPagamento === 'cheque'"
                  label="Numero do cheque"
                  label-for="search-field"
                  breakpoint="md"
                >
                  <input
                    v-model="numeroCheque"
                    v-validate="'required'"
                    name="simple"
                    :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
                    type="number"
                    id="basic"
                  />
                  <span class="text-danger" v-if="errors.has('simple')">
                    {{ errors.first("simple") }}
                  </span>
                </b-form-group>
              </b-col>
            </b-row>

            <div class="form-action bg-transparent px-0">
              <b-button
                type="submit"
                variant="success"
                class="btn-rounded float-right"
                @click="onSubmit"
              >
                Salvar
              </b-button>
              <b-button
                type="button"
                variant="default"
                class="btn-rounded"
                to="/app/produto/list"
              >
                Cancel
              </b-button>
            </div>
          </b-form>
        </Widget>
      </b-col>

      <b-col lg="12">
        <Widget customHeader>
          <!-- <b-button class="mr-sm" variant="primary" v-b-modal.demo>Demo</b-button> -->

          <b-row class="mt-md mb-md">
            <b-col lg="3">
              <b-form-group
                horizontal
                label="Cliente"
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
            <b-col lg="3">
              <b-form-group
                horizontal
                label="Periodo de"
                label-for="search-select"
                :label-cols="4"
              >
                <input
                  name="simple"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
                  type="date"
                  id="basic"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Selecione</th>
                <th>Codigo</th>
                <th>Cliente</th>
                <th>Emitido em</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(factura, index) in filteredFacturas" :key="index">
                <td>
                  <!-- Checkbox para selecionar a fatura -->
                  <input
                    size="lg"
                    type="checkbox"
                    :value="factura.factura.id"
                    v-model="selectedFacturas"
                  />
                </td>
                <td>{{ factura.factura.codigoFactura }}</td>
                <td>{{ factura.cliente.nome }}</td>
                <td>{{ formatarData(factura.factura.data) }}</td>
                <td>
                  <b-badge
                    :variant="
                      factura.factura.estado === 'pendente' ? 'warning' : 'success'
                    "
                  >
                    {{ factura.factura.estado }}
                  </b-badge>
                </td>
                <td>
                  <b-button-group class="mb-3">
                    <b-button
                      target="_blank"
                      size="xs"
                      variant="primary"
                      :to="{
                        name: 'factura-detalhes',
                        params: { facturaId: factura.id },
                      }"
                    >
                      <i class="fa fa-eye mr-0 mb-xs" />
                      Ver</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </tbody>
          </table>
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
      numeroCheque: "",
      formaPagamento: "numerario",
      facturas: [],
      selectedFacturas: [],
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
  computed: {
    filteredFacturas() {
      // Retorna apenas as faturas com estado "pendente"
      return this.facturas.filter((factura) => factura.factura.estado === "pendente");
    },
  },

  mounted() {
    this.getData();
  },
  methods: {
    formatarData(data) {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(new Date(data));
    },
    onSubmit(e) {
      e.preventDefault();

      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.saveData();
        } else {
          this.$swal({
            title: "Erro!",
            text: "A Operação Falhou!",
            icon: "Error",
            confirmButtonText: "OK",
          });
        }
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
        .get("/venda", config)
        .then((result) => {
          this.facturas = result.data.vendas.reverse();
        })
        .catch((error) => {});
    },

    saveData() {
      this.$validator.validateAll();
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        facturas: this.selectedFacturas,
        formaPagamento: this.formaPagamento,
        numeroCheque: this.numeroCheque,
        estado: "pago",
      };
      http
        .post("/recibos", data, config)
        .then((result) => {
          this.$swal({
            title: "Sucesso!",
            text: "Operação realizada com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.$bvModal.hide("add");
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
  },
};
</script>
