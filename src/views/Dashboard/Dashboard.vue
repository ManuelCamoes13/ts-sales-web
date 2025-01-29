<template>
  <div class="dashboard-page">
    <h1 class="page-title">Painel de controle <small>empresarial</small></h1>
     <b-row>
      <b-col lg="3" md="6" xs="12">
        <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <i class="fi flaticon-like text-primary" />
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">Utilizadores</h6>
                <p class="h2 m-0 fw-normal">20</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">Activos</h6>
                <p class="value5">5</p>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">Inactivos</h6>
                <p class="value5">3</p>
              </b-col>
            </b-row>
          </div>
        </Widget>
      </b-col>
      <b-col lg="3" md="6" xs="12">
        <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <i class="fi flaticon-magic-wand text-danger" />
                </span>
              </b-col>
              <b-col xs="9">
                <div class="overflow-hidden">
                  <transition name="carousel" mode="out-in">
                    <div v-if="carouselFirstGroup" key="first">
                      <h6 class="m-0">Ganhos totais</h6>
                      <p class="h2 m-0 fw-normal">12,324</p>
                    </div>
                    <div v-else key="second">
                      <h6 class="m-0">MAOS DE OBRA</h6>
                      <p class="h2 m-0 fw-normal">11,885</p>
                    </div>
                  </transition>
                </div>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">New Visitors</h6>
                <div class="overflow-hidden">
                  <transition name="carousel" mode="out-in">
                      <p v-bind:key="carouselFirstGroup" class="value5">
                        {{carouselFirstGroup ? '1,332' : '20.1%'}}
                      </p>
                  </transition>
                </div>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">Bounce Rate</h6>
                <div class="overflow-hidden">
                  <transition name="carousel" mode="out-in">
                    <p v-bind:key="carouselFirstGroup" class="value5">
                      {{carouselFirstGroup ? '217' : '2.3%'}}
                    </p>
                  </transition>
                </div>
              </b-col>
            </b-row>
          </div>
        </Widget>
      </b-col>
      <b-col lg="3" md="6" xs="12">
        <Widget>
          <div class="overflow-hidden">
            <transition name="carousel" mode="out-in">
              <div v-if="carouselFirstGroup" key="first">
                <b-row class="flex-nowrap">
                  <b-col xs="3">
                    <span class="widget-icon">
                      <i class="fi flaticon-notebook-4 text-info"/>
                    </span>
                  </b-col>
                  <b-col xs="9">
                    <h6 class="m-0">MAOS DE OBRA</h6>
                    <p class="h2 m-0 fw-normal">82,765</p>
                  </b-col>
                </b-row>
                <b-row class="flex-nowrap">
                  <b-col xs="6">
                    <h6 class="m-0">Avg. Time</h6>
                    <p class="value5">2:56</p>
                  </b-col>
                  <b-col xs="6">
                    <h6 class="m-0">Last Week</h6>
                    <p class="value5">374</p>
                  </b-col>
                </b-row>
              </div>
              <div v-else key="second">
                <b-row class="flex-nowrap">
                  <b-col xs="3">
                    <span class="widget-icon">
                      <i class="fi flaticon-shuffle text-info"/>
                    </span>
                  </b-col>
                  <b-col xs="9">
                    <h6 class="m-0">PRODUTOS</h6>
                    <p class="h2 m-0 fw-normal">13.8</p>
                  </b-col>
                </b-row>
                <b-row class="flex-nowrap">
                  <b-col xs="6">
                    <h6 class="m-0">Produtos</h6>
                    <p class="value5">100</p>
                  </b-col>
                  <b-col xs="6">
                    <h6 class="m-0">Advanced</h6>
                    <p class="value5">1,441</p>
                  </b-col>
                </b-row>
              </div>
            </transition>
          </div>
        </Widget>
      </b-col>
      <b-col lg="3" md="6" xs="12">
        <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <i class="fi flaticon-diamond text-success" />
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">Ganhos Totais</h6>
                <p class="h2 m-0 fw-normal">7,448MT</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">Ultimo mes</h6>
                <p class="value5">83,541MT</p>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">Ultima Semana</h6>
                <p class="value5">17,926MT</p>
              </b-col>
            </b-row>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>
