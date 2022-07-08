<template>
    <div>
        <el-form :inline="true" :model="entity" class="demo-form-inline" size="mini">
            <el-row type="flex" justify="start">
                <el-col :span="6">
                    <el-form-item label="账号名称">
                        <el-input v-model="entity.accountName" placeholder="输入账号名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="账号类型">
                        <el-radio-group v-model="entity.accountType">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="官方"></el-radio-button>
                            <el-radio-button label="渠道"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="日期">
                        <el-col :span="8">
                        <el-date-picker
                        v-model="entity.startDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                        </el-col>
                       <el-col class="line" :span="2">-</el-col>
                        <el-col :span="8">
                         <el-date-picker
                        v-model="entity.endDate"
                        value-format="yyyy-MM-dd"
                        type="date" 
                        placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                         </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="start">
                <el-col :span="6">
                    <el-form-item label="店铺名">
                        <el-input v-model="entity.storeName" placeholder="输入店铺名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="合作模式">
                    <el-radio-group v-model="entity.coopMode">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="自营"></el-radio-button>
                            <el-radio-button label="带货"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                 <el-col :span="1">
                    <div width="100px"></div>
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
            prop="date"
            label="日期">
            </el-table-column>
            <el-table-column
            prop="accountName"
            label="账号名称">
            </el-table-column>
             <el-table-column
            prop="storeName"
            label="店铺名">
            </el-table-column>
            <el-table-column
            prop="accountType"
            label="账号类型">
            </el-table-column>
            <el-table-column
            prop="coopMode"
            label="合作模式">
            </el-table-column>
            <el-table-column
            prop="gmv"
            label="成交金额">
            </el-table-column>
            <el-table-column
            prop="peopleNumber"
            label="成交人数">
            </el-table-column>
            <el-table-column
            prop="unitPrice"
            label="成交客单价">
            </el-table-column>
            <el-table-column
            prop="clickTransactionRate"
            label="商品点击成交率">
            </el-table-column>
            <el-table-column
            prop="liveAmount"
            label="直播成交金额">
            </el-table-column>
            <el-table-column
            prop="shortVideoAmount"
            label="短视频成交金额">
            </el-table-column>
            <el-table-column
            prop="cardAmount"
            label="商品卡成交金额">
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
                        <el-form-item label="料号" :label-width="formLabelWidth">
                            <el-input v-model="single.itemCode" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目标类型" :label-width="formLabelWidth">
                            <el-input v-model="single.targetType" :readonly="readonly"></el-input>
                        </el-form-item>
                   </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="年" :label-width="formLabelWidth">
                            <el-input v-model="single.year" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="月" :label-width="formLabelWidth">
                            <el-input v-model="single.month" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="14">
                        <el-form-item label="目标零支销售量" :label-width="formLabelWidth">
                            <el-input v-model="single.saleNumber" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="14">
                        <el-form-item label="目标零支销售单价" :label-width="formLabelWidth">
                            <el-input v-model="single.salePrice" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                   <el-col :span="14">
                <el-form-item label="目标财务毛利额" :label-width="formLabelWidth">
                    <el-input v-model="single.saleAmount" :readonly="readonly"></el-input>
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
            url: this.$url+'T_NEW_RETAIL_DYGMV/import',
            headers: { token : localStorage.getItem('token') },
            entity: {
                accountType:'',
                coopMode:''
            },
            tableData:[],
            currentPage:1,
            pageSize:5,
            totalNum:0,
            single: {},
            formLabelWidth: '140px',
            dialogFormVisible: false,
            readonly: false,
            pageFlg: false
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
            this.pageFlg=true;
            this.handleSearch(this.entity);
            console.log(`当前页: ${val}`);
        },
        handleSearch(entity){             
            //将提交的数据进行封装
            this.entity.size=this.pageSize;
            if(this.pageFlg) {
                this.entity.page=this.currentPage-1;
            } else {
                this.currentPage=1;
                this.entity.page=0;
            }
            //this.entity.sort='updateTime,desc','sort=launchTime,desc';
            //调用函数  传递参数 获取结果
            this.$axios.get('/T_NEW_RETAIL_DYGMV',{params:entity}).then(res=>{
                if(res.status=='200'){
                    this.totalNum=Number(res.headers['x-total-count']);
                    this.tableData=res.data;           
                }else{
                        
                }
            }) 
            this.pageFlg=false;
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
                this.$axios.put('/T_NEW_RETAIL_DYGMV',single).then(res=>{
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
            this.$axios.get('/T_NEW_RETAIL_DYGMV/file',{responseType: 'blob'}).then(res=>{
                    console.log(res);
                    if (!res) {
                        return
                    }
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                     console.log(url);
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', 'T_NEW_RETAIL_DYGMV模板.xlsx')
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