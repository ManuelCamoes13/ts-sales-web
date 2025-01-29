<template>
  <b-row>
    <b-col lg="11">
      <!-- {{maoDeObras}} -->
      <b-row class="invoice-page">
        <b-col xs="12">
          <Widget>
            <header>
              <b-row>
                <b-col md="6" xs="12" class="b-col-print-6">
                  <img src="../../assets/careca.jpg" alt="Logo" class="invoiceLogo" />
                </b-col>
                <b-col md="6" xs="12" class="b-col-print-6">
                  <h4 class="text-right">
                    #<span class="fw-semi-bold">
                     {{ recibo.codigo}}</span
                    >
                    /
                    <small>{{ recibo.createdAt}}</small>
                  </h4>
                  <div class="text-muted fs-larger text-right">
                    <strong>Estado: </strong>
                    <span>
                      <!-- <b-badge
                        :variant="
                          factura.venda.factura.estado === 'pendente'
                            ? 'warning'
                            : 'success'
                        "
                      >
                        {{ factura.venda.factura.estado }}
                      </b-badge> -->
                    </span>
                  </div>
                </b-col>
              </b-row>
            </header>
            <section class="invoiceBody">
              <b-row class="mb-lg">
                <b-col sm="6" class="b-col-print-6">
                  <h5 class="text-muted no-margin">Informações da Empresa</h5>
                  <h3 class="company-name m-t-1">Careca Tubos</h3>
                  <address>
                    <strong>Av. Mocambique, Maputo</strong><br />
                    Bairro Nsalene<br />
                    <strong>NUIT: </strong>1234456789<br />
                    <abbr title="Work Fax">Telefone: </abbr> +258 84 00 00 000 <br />
                    <abbr title="Work email">e-mail: </abbr>
                    <a href="mailto:#">carecatubos@gmail.com</a><br />
                  </address>
                  <!-- <h6 class="fw-semi-bold no-margin">Formas de pagamento</h6>
                  <strong>BCI: </strong>0000000009126718275<br />
                  <strong>MBIM: </strong>000000000332319887<br />
                  <strong>Mpesa: </strong>84 00 00 000<br /> -->
                </b-col>

                 <b-col sm="6" class="b-col-print-6 text-right">
                  <h5 class="text-muted no-margin">Informações do pagamento</h5>
                  <address>
                   
                      <strong>Forma de pagamento: </strong>{{recibo.formaPagamento }} <br>
                       <strong>Numero de cheque: </strong>{{recibo.numeroCheque }} <br>
                   
                  </address>
                </b-col>
              </b-row>

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Factura</th>
                    <th class="hidden-sm-down d-print-none">Cliente</th>
                    <th>Emitido em</th>
                    <!-- <th class="hidden-sm-down d-print-none">Preço unitario</th>
                    <th>Total</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(factura, index) in recibo.Facturas" :key="index">
                  <td>{{index + 1}}</td>
                      <td>{{factura.codigoFactura}}</td>
                    <td>{{factura.codigoFactura}}</td>
                    <td>{{factura.createdAt}}</td>
                  </tr>
                </tbody>
              </table>

              <b-row>
                <b-col xs="12" md="8" class="b-col-print-6">
                  <!-- <p>
                    <strong>Note:</strong>
                    Alguma nota na factura
                  </p> -->
                </b-col>
                <b-col md="4" xs="12" class="b-col-print-6">
                  <b-row class="text-right justify-content-end">
                    <b-col xs="6"></b-col>
                    <b-col sm="3">
                      <!-- <p class="no-margin"><strong>Total</strong></p> -->
                    </b-col>
                    <b-col sm="3">
                      <!-- <p>{{ subtotal }}</p> -->
                      <!-- <p>{{ iva }}</p> -->
                      <!-- <p>0</p> -->
                      <p class="no-margin">
                        <!-- <strong>{{ total }}</strong> -->
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <!-- <p class="text-right mt-lg mb-xs">Marketing Consultant</p>
              <p class="text-right">
                <span class="fw-semi-bold">Bob Smith</span>
              </p> -->
              <b-button-toolbar class="mt-lg justify-content-end d-print-none">
                <b-button onClick="{this.printInvoice}" variant="inverse" class="mr-2">
                  <i class="fa fa-print" />
                  &nbsp;&nbsp; Imprimir
                </b-button>
                <!-- <b-button variant="success" v-b-modal.add>
                  Efectuar pagamento &nbsp;
                  <span class="circle bg-white">
                    <i class="fa fa-arrow-right text-success" />
                  </span>
                </b-button> -->
              </b-button-toolbar>
            </section>
          </Widget>
        </b-col>
      </b-row>
    </b-col>
    <b-modal
      id="add"
      title="Efectuar pagamento"
      body-class="bg-white"
      cancel-variant="default"
      hide-footer
    >
      <b-form @submit.prevent="handleSubmit">
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

        <!-- Campo número do cheque aparece apenas se a opção "cheque" for selecionada -->
        <b-form-group
          v-if="formaPagamento === 'cheque'"
          label="Numero do cheque"
          label-for="search-field"
          breakpoint="md"
        >
          <input
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
      unidade: "pcs",

      facturas: [],
      recibo:[]
    };
  },

 
  mounted() {
    this.getData();
  },
  methods: {
    
   

    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      const reciboId = this.$route.params.reciboId;

      http
        .get(`/recibos/${reciboId}`, config)
        .then((result) => {
          this.recibo = result.data;
          // this.facturas = result.data;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style src="./Invoice.scss" lang="scss" scoped />
