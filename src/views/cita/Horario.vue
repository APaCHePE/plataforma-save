<template>
  <div class="light">
    <div class="single">
      <div class="container">
        <div class="single--container">
          <template>
            <div class="one" style="column-count: 2">  
              <div>
                <p style="color: #4D4D4D;text-shadow: #858585 3px 3px 3px; font-size: 40px;">Abogado</p><br><br>
                <p>Seleccione dia de diponibilidad</p><br>
                <el-radio v-model="radio" label="1" disabled>Seleccion por dia</el-radio><br><br>  
                <div class="block" >
                  <el-date-picker
                    v-if="this.radio == '1'"
                    v-model="fecha"
                    @change="prueba_fecha"
                    type="dates"
                    placeholder="Elije una fecha"
                    :picker-options="pickerOptions"
                    min ="2020-11-26">
                  </el-date-picker>
                  <el-date-picker
                    v-if="this.radio == '2'"
                    v-model="fecha"
                    @change="prueba_fecha"
                    type="dates"
                    placeholder="Elije una fecha"
                    :picker-options="pickerOptions"
                    min ="2020-11-26"
                    disabled>
                  </el-date-picker>
                </div><br> 
                <!-- <el-radio v-model="radio" label="2">Seleccion por semana</el-radio><br><br>   -->
                <!-- <div class="block">
                  <template >
                    <el-select v-if="this.radio == '1'" v-model="value1" multiple placeholder="Select" disabled>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                  <template>
                    <el-select v-if="this.radio == '2'" v-model="value1" multiple placeholder="Select">
                      <el-option 
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </div><br>  -->
              </div>

              <div><br>
                <div style="text-align: center"><img style="width:50%" src="https://www.flaticon.es/premium-icon/icons/svg/1292/1292818.svg"></div>
                <p style="font-size: 30px; color: #4178DA; ">Disponibilidad de horario</p><br>
                <div style="column-count: 3">
                  <div v-for="(item, index) in turnos" :key="index">   
                    <div>
                      <h3 v-if="index == 0">Turno mañana</h3>
                      <div v-if="index>=0 & index<=5"><br>
                        <el-checkbox :label="item" v-model="selectTurnos">{{item}}</el-checkbox>
                        <br>
                      </div>
                    </div>
                    <div>
                      <h3 v-if="index == 6">Turno tarde</h3>
                      <div v-if="index>=6 & index<=11"><br>
                        <el-checkbox :label="item" v-model="selectTurnos">{{item}}</el-checkbox><br>
                      </div>
                    </div>
                    <div>
                      <h3 v-if="index == 12">Turno noche</h3>
                      <div v-if="index>=12 & index<=17"><br>
                        <el-checkbox :label="item" v-model="selectTurnos">{{item}}</el-checkbox><br>
                      </div>
                    </div>
                  </div>
                </div><br><br>
                <div class="align-right"><el-button type="primary" @click="grabar()" round
                  >Grabar</el-button>
                </div><br><br>
                <div>
                  <message-confirm v-if="showModal" @modalShow="modalShow" :dato="dato"/>
                </div>
              </div>
            </div>
          </template>
        </div>    
      </div>
    </div>
  </div>   
 
</template>

<script>

import MessageConfirm from '@/components/shared/MessageConfirm.vue'
import moment from 'moment'
const turnosHora = ['8:00 AM a  8:30 AM', '8:30 AM a  9:00 AM', '9:00 AM a  9:30 AM',
 '09:30 AM a 10:00 AM','10:00 AM a 10:30 AM','10:30 AM a 11:00 AM','12:00 AM a 12:30 AM',
 '12:30 AM a 13:00 AM','13:00 AM a 13:30 AM','13:30 AM a 14:00 AM','14:00 AM a 14:30 AM',
 '14:30 AM a 15:00 AM','18:00 AM a 18:30 AM','18:30 AM a 19:00 AM','19:00 AM a 19:30 AM',
 '19:30 AM a 20:00 AM','20:00 AM a 20:30 AM','20:30 AM a 21:00 AM'];
export default {
  props:['id_abogado'],
  components: {
    MessageConfirm
  },
  data () {
    return {
      turnos: turnosHora,
      selectTurnos: [],
      id_abo: null,
      fecha:[],
      horario: {
        listH:[]
      },
      dato:{
        fecha: [],
        turno: []
      },
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
      },
      showModal: false,
      radio: '1',
      options: [
       {value: '1',label: 'Lunes'}, 
       {value: '2',label: 'Martes'},
       {value: '3',label: 'Miercoles'}, 
       {value: '4',label: 'Jueves'}, 
       {value: '5',label: 'Viernes'}],

      value1: [],

    }
  },
  created() {
    this.getAsesoriaAbogado()
  },
  methods: {
    modalShow(val){
      if (this.showModal == false) {
        this.showModal = true
      }else{
        this.showModal = false
      }
      if(val == 1){
        this.createHorario()
        this.selectTurnos = []
        this.fecha = []
        this.horario.listH = []
      }
      if (val == 2) {
        this.selectTurnos = []
        this.fecha = []
        this.horario.listH = []
      }
    },
    createHorario(){
      const endpoint = "/crearHorario/";
      this.$http.post(endpoint, this.horario).then((response) => {
         console.log(response + "endpoint")
         //window.location.reload()  
      });
      this.showModal = false;
    },
    prueba_fecha(){
      var bandera = this.fecha.length
      for(var i=0; i<bandera; i++){
        console.log(moment(this.fecha[i]).format('dddd, MMMM Do'))
        // console.log(moment(this.fecha[i]).format('ddddd'))
      }      
    },
    grabar(){    
      this.fecha.forEach(fechaDia=>{
        this.selectTurnos.forEach(element=>{
          this.horario.listH.push(
          {
            hora: element,
            id_abogado: this.id_abo,
            fecha: moment(fechaDia).format(),
            dia: parseInt(moment(fechaDia).format('ddddd').charAt(moment(fechaDia).format('ddddd').length-1))
          });
        })        
      });
      //para pasar por props
      this.dato.fecha = this.fecha;
      for (let index = 0; index < this.dato.fecha.length; index++) {
        this.dato.fecha[index] = moment(this.dato.fecha[index]).format('dddd, MMMM Do');
      }
      this.dato.turno = this.selectTurnos;
      this.showModal = true;
    },

    //getAsesoriaAbogado solo se utiliza para un for , editar esto
    getAsesoriaAbogado(){
              const endpoint = '/getAsesoriaAbogado/00/00/'+this.id_abogado+'/00'
      this.$http.get(endpoint).then((response) => {
        this.id_abo = response.data.resultado[0].abogado.id_abogado
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }
};
</script>

<style lang="scss">
@media only screen and (max-width: 600px) {
  .single--container{
    .one{
      display: none !important;
    }
    .two{
      display: inline-block !important;
      .lawyer{
        text-align: center;
        margin-left: 25px !important;
      }
      .time{
        margin-left: 25px !important;
        text-align: center !important;
      }
    }
  }
}

</style>