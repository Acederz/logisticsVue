<template>
    <div>
        <el-form :inline="true" :model="entity" class="demo-form-inline" size="mini">
            <el-row type="flex" justify="start">
                <el-col :span="6">
                    <el-form-item label="条码">
                        <el-input v-model="entity.barCode" placeholder="输入条码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="品名">
                        <el-input v-model="entity.itemName" placeholder="输入品名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="越南文">
                        <el-input v-model="entity.vnString" placeholder="输入越南文"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="英文品名">
                        <el-input v-model="entity.enString" placeholder="输入英文品名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                     <el-form-item>
                        <el-button size="mini" type="primary" @click="handleSearch(entity)">查询</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                     <el-form-item>
                        <el-button size="mini" type="primary" @click="handleDownload()">下载模板</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :headers = "headers"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :show-file-list="false" 
                    :on-success="handleSuccess"
                    :on-error="handleFailed">
                        <el-button size="mini" type="primary">上传文件</el-button>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row type="flex" justify="start">
                 <el-col :span="6">
                  
                </el-col>
                <el-col :span="6">
                   
                </el-col>
            </el-row>
            <el-row type="flex" justify="end">
                <el-col :span="20">
                    <div width="300px"></div>
                </el-col>
                
            </el-row>
        </el-form>  
        <el-divider></el-divider>
        <el-table
            :data="tableData"    
            border
            style="width: 100%">
            <el-table-column 
            fixed="left" 
            prop="barCode"
            width="150"
            label="条码">
            </el-table-column>
            <el-table-column
            prop="itemName"
            width="150"
            label="品名">
            </el-table-column>
            <el-table-column
            prop="vnString"
            width="200"
            label="越南文">
            </el-table-column>
            <el-table-column
            prop="enString"
            width="200"
            label="英文品名">
            </el-table-column>
            <el-table-column
            prop="number"
            width="100"
            label="箱入数">
            </el-table-column>
            <el-table-column
            prop="productPlace"
            width="100"
            label="产地">
            </el-table-column>
            <el-table-column
            prop="country"
            width="100"
            label="国家">
            </el-table-column>
            <el-table-column
            prop="countryCode"
            width="100"
            label="国家码">
            </el-table-column>
            <el-table-column
            prop="brand"
            width="100"
            label="品牌">
            </el-table-column>
            <el-table-column
            prop="category"
            width="100"
            label="品类">
            </el-table-column>
            <el-table-column
            prop="categoryCode"
            width="100"
            label="品类代码">
            </el-table-column>
            <el-table-column
            prop="series"
            width="100"
            label="系列">
            </el-table-column>
            <el-table-column
            prop="seriesCode"
            width="100"
            label="系列代码">
            </el-table-column>
            <el-table-column
            prop="barCodeFlow"
            width="100"
            label="条码流水">
            </el-table-column>
            <el-table-column
            prop="itemCode"
            width="100"
            label="料号">
            </el-table-column>
            <el-table-column
            prop="boxCode"
            width="100"
            label="箱条码">
            </el-table-column>
            <el-table-column
            prop="qualityName"
            width="100"
            label="品质规范产品简称">
            </el-table-column>
            <el-table-column
            prop="hsCode"
            width="100"
            label="HS_CODE">
            </el-table-column>
            <el-table-column
            prop="itemSize"
            width="150"
            label="产品尺寸">
            </el-table-column>
            <el-table-column
            prop="boxSize"
            width="150"
            label="箱尺寸">
            </el-table-column>
            <el-table-column
            prop="boxVolume"
            width="100"
            label="箱体积">
            </el-table-column>
            <el-table-column
            prop="buyBoxVolume"
            width="100"
            label="采购箱体积">
            </el-table-column>
            <el-table-column
            prop="grossWeight"
            width="100"
            label="毛重KG">
            </el-table-column>
            <el-table-column
            prop="netWeight"
            width="100"
            label="净重KG">
            </el-table-column>
            <el-table-column
            prop="tableName"
            width="200"
            label="库存表名称">
            </el-table-column>
            <el-table-column 
            fixed="right"
            label="操作"
            width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,true)" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick(scope.row,false)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next"
        :total="totalNum">
        </el-pagination>
        </el-row>
        <el-dialog title="详细信息" :visible.sync="dialogFormVisible">
            <el-form label-position="left" :model="single" ref="single">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="条码" :label-width="formLabelWidth">
                            <el-input v-model="single.barCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="品名" :label-width="formLabelWidth">
                            <el-input v-model="single.itemName" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="越南文" :label-width="formLabelWidth">
                            <el-input v-model="single.vnString" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="英文品名" :label-width="formLabelWidth">
                            <el-input v-model="single.enString" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="箱入数" :label-width="formLabelWidth">
                            <el-input v-model="single.number" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产地" :label-width="formLabelWidth">
                            <el-input v-model="single.productPlace" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="国家" :label-width="formLabelWidth">
                            <el-input v-model="single.country" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="国家码" :label-width="formLabelWidth">
                            <el-input v-model="single.countryCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="品牌" :label-width="formLabelWidth">
                            <el-input v-model="single.brand" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="品类" :label-width="formLabelWidth">
                            <el-input v-model="single.category" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="品类代码" :label-width="formLabelWidth">
                            <el-input v-model="single.categoryCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="条码流水" :label-width="formLabelWidth">
                            <el-input v-model="single.barCodeFlow" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="系列" :label-width="formLabelWidth">
                            <el-input v-model="single.series" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="系列代码" :label-width="formLabelWidth">
                            <el-input v-model="single.seriesCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="料号" :label-width="formLabelWidth">
                            <el-input v-model="single.itemCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="箱条码" :label-width="formLabelWidth">
                            <el-input v-model="single.boxCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="品质规范简称" :label-width="formLabelWidth">
                            <el-input v-model="single.qualityName" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="HS_CODE" :label-width="formLabelWidth">
                            <el-input v-model="single.hsCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="产品尺寸" :label-width="formLabelWidth">
                            <el-input v-model="single.itemSize" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="箱尺寸" :label-width="formLabelWidth">
                            <el-input v-model="single.boxSize" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="箱体积" :label-width="formLabelWidth">
                            <el-input v-model="single.boxVolume" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="采购箱体积" :label-width="formLabelWidth">
                            <el-input v-model="single.buyBoxVolume" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="毛重KG" :label-width="formLabelWidth">
                            <el-input v-model="single.grossWeight" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="净重KG" :label-width="formLabelWidth">
                            <el-input v-model="single.netWeight" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="库存表名称" :label-width="formLabelWidth">
                            <el-input v-model="single.tableName" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleSubmit(single,readonly)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fileList: [],
            url: this.$url+'T_VIETNAM_POA_FILE/import',
            headers: { token : localStorage.getItem('token') },
            entity: {
            },
            tableData:[],
            currentPage:1,
            pageSize:5,
            totalNum:0,
            single: {},
            formLabelWidth: '140px',
            dialogFormVisible: false,
            readonly: false
        }; 
    },
    methods: {
        handleFailed(err, file, fileList) {
            this.$message.error(err);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`只能上传一个文件`);
        },
        handleSuccess(response, file, fileList) {
            this.$message.success(file.name+'上传成功！');
            this.$refs.upload.clearFiles()
            this.handleSearch(this.entity);
        },
        handleSizeChange(val) {
            this.pageSize=val;
            this.handleSearch(this.entity);
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.handleSearch(this.entity);
            console.log(`当前页: ${val}`);
        },
        handleSearch(entity){             
            //将提交的数据进行封装
            this.entity.size=this.pageSize;
            this.entity.page=this.currentPage-1;
            //this.entity.sort='updateTime,desc','sort=launchTime,desc';
            console.log("查询");
            console.log(entity);
            //调用函数  传递参数 获取结果
            this.$axios.get('/T_VIETNAM_POA_FILE',{params:entity}).then(res=>{
                if(res.status=='200'){
                    this.totalNum=Number(res.headers['x-total-count']);
                    this.tableData=res.data;           
                }else{
                        
                }
            }) 
        },
        handleClick(row,boolean) {
            this.single=JSON.parse(JSON.stringify(row));
            this.readonly=boolean;
            this.dialogFormVisible = true;
        },
        handleCancel() {
            this.dialogFormVisible = false;
            this.single={};
        },
        handleSubmit(single,boolean) {
            if(!boolean) {
                this.$axios.put('/T_VIETNAM_POA_FILE',single).then(res=>{
                    console.log(res);
                    if(res.status=='200'){
                       this.$message.success('修改成功！');
                       this.handleSearch(this.entity);         
                    }else{
                       this.$message.error("未知错误，请联系管理员");   
                    }
                }).catch(err=>{
                    this.$message.error(err.response.data.message);
                })
            }
            this.dialogFormVisible = false; 
        },
        handleDownload() {//模板下载
            this.$axios.get('/T_VIETNAM_POA_FILE/file',{responseType: 'blob'}).then(res=>{
                    console.log(res);
                    if (!res) {
                        return
                    }
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                     console.log(url);
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', 'T_VIETNAM_POA_FILE模板.xlsx')
                    document.body.appendChild(link)
                    link.click()
                })
        }
    },
    created: function() {
        this.handleSearch(this.entity);
    }
}
</script>
<style>
    .el-form {
        margin-top: -15px;
    }

    .el-table {
        margin-top: -15px;
    }

    .el-dialog .el-input {
        width: 200px;
        margin-left: -60px;
    }

    .el-dialog .el-textarea {
        margin-left: -55px;
    }
</style>