<template>
    <!-- <el-card shadow="always"> -->
        <div>

        <div class="desk">
        <el-table
        :data="listQuestion1"
        style="width: 100%"
        >
        <el-table-column
            width="90"
            prop="asesoria.id_formato"
            label="Caso">
        </el-table-column>
        <el-table-column
            width="150"
            prop="fecha_creacion"
            label="Fecha">
        </el-table-column>
        <el-table-column
            width="450"
            prop="asesoria.descripcionAsistenteRecortado"
            :label="'Descripción'">
        </el-table-column>
        <el-table-column
            prop="id_005_estado"
            label="Estado">
            <template slot-scope="scope">
            <router-link :to="`/text/${scope.row.id_asesoria_abogado}`" class="card">
                <el-button v-if="scope.row.respuesta == null" size="mini" type="warning">Responder</el-button> 
                <el-button v-else size="mini" type="primary">Ver respuesta</el-button> 
            </router-link>
            </template>
        </el-table-column>
        </el-table>
        </div>

        <div class="mobile">
        <el-table
        :data="listQuestion1"
        style="width: 100%"
        >
        <el-table-column type="expand">
            
            <template slot-scope="scope">
            <p >Fecha: </p><p style="color: #A0A0A0"> {{ scope.row.fecha_creacion}}</p><br>    
            <router-link :to="`/text/${scope.row.id_asesoria_abogado}`" class="card">
            <el-button v-if="scope.row.respuesta == null" size="mini" type="warning">Responder</el-button> 
            <el-button v-else size="mini" type="primary">Ver respuesta</el-button> 
            </router-link>
            </template>
        </el-table-column>
        <el-table-column
            width="90"
            prop="asesoria.id_formato"
            label="Caso">
        </el-table-column>
        <el-table-column
            width="450"
            prop="asesoria.descripcionAsistenteRecortado"
            :label="'Descripción'">
        </el-table-column>
        </el-table>
        </div>
        </div>
    <!-- </el-card>  -->
</template>

<script>
export default {
props: ["listQuestion1"]
}
</script>

<style lang="scss">
.mobile{
  display: none;
}
.not-data {
  i {
    font-size: 70px;
    color: #ddf3ff;
  }
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
@media only screen and (max-width: 600px) {
.desk{
  display: none
}
.mobile{
  display: block
}


}
</style>