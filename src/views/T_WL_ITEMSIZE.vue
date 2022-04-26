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
                    <el-form-item label="货品编号">
                        <el-input v-model="entity.itemCode" placeholder="输入货品编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="品名">
                        <el-input v-model="entity.productName" placeholder="输入品名"></el-input>
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
                    :action="url"
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
                <el-col :span="12">
                    <el-form-item label="更新时间">
                        <el-col :span="8">
                        <el-date-picker
                        v-model="entity.updateTimeStart"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                        </el-col>
                       <el-col class="line" :span="2">-</el-col>
                        <el-col :span="8">
                         <el-date-picker
                        v-model="entity.updateTimeEnd"
                        value-format="yyyy-MM-dd"
                        type="date" 
                        placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                         </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上架时间">
                        <el-col :span="8">
                        <el-date-picker
                        v-model="entity.launchTimeStart"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                        </el-col>
                       <el-col class="line" :span="2">-</el-col>
                        <el-col :span="8">
                         <el-date-picker
                        v-model="entity.launchTimeEnd"
                        type="date" 
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                         </el-col>
                    </el-form-item>
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
            prop="barCode"
            label="条码">
            </el-table-column>
            <el-table-column
            prop="itemCode"
            label="货号">
            </el-table-column>
            <el-table-column
            prop="productName"
            label="品名">
            </el-table-column>
            <el-table-column
            prop="length"
            label="长">
            </el-table-column>
            <el-table-column
            prop="width"
            label="宽">
            </el-table-column>
            <el-table-column
            prop="height"
            label="高">
            </el-table-column>
            <el-table-column
            prop="launchTime"
            label="上架时间">
            </el-table-column>
             <el-table-column
            prop="updateTime"
            label="更新时间">
            </el-table-column>
             <el-table-column
            prop="remarks"
            label="备注">
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
                        <el-form-item label="货号" :label-width="formLabelWidth">
                            <el-input v-model="single.itemCode" :readonly="readonly"></el-input>
                        </el-form-item>
                   </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="品名" :label-width="formLabelWidth">
                            <el-input v-model="single.productName" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="长" :label-width="formLabelWidth">
                            <el-input v-model="single.length" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                <el-form-item label="宽" :label-width="formLabelWidth">
                    <el-input v-model="single.width" :readonly="readonly"></el-input>
                </el-form-item>
                </el-col>
                    <el-col :span="12">
                <el-form-item label="高" :label-width="formLabelWidth">
                    <el-input v-model="single.height" :readonly="readonly"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="20">
                   <el-col :span="12">
                <el-form-item label="更新时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="single.updateTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期" :readonly="readonly">
                    </el-date-picker>
                </el-form-item>
                   </el-col>
               
                    <el-col :span="12">
                <el-form-item label="上架时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="single.launchTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期" :readonly="readonly">
                    </el-date-picker>
                </el-form-item>
              </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="14">
                 <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="single.remarks" :readonly="readonly"></el-input>
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
            url: this.$url+'T_WL_ITEMSIZE/import',
            entity: {},
            tableData:[],
            currentPage:1,
            pageSize:5,
            totalNum:0,
            single: {},
            formLabelWidth: '100px',
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
            this.entity.sort='updateTime,desc','sort=launchTime,desc';
            console.log("查询");
            console.log(entity);
            //调用函数  传递参数 获取结果
            this.$axios.get('/T_WL_ITEMSIZE',{params:entity}).then(res=>{
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
                this.$axios.put('/T_WL_ITEMSIZE',single).then(res=>{
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
            this.$axios.get('/T_WL_ITEMSIZE/file',{responseType: 'blob'}).then(res=>{
                    console.log(res);
                    if (!res) {
                        return
                    }
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                     console.log(url);
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', 'T_WL_ITEMSIZE模板.xlsx')
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