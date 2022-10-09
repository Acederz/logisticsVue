<template>
    <div>
        <el-form :inline="true" :model="entity" class="demo-form-inline" size="mini">
            <el-row type="flex" justify="start">
                <el-col :span="6">
                    <el-form-item label="料号">
                        <el-input v-model="entity.itemCode" placeholder="输入料号" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="料号简称">
                        <el-input v-model="entity.itemName" placeholder="输入料号简称" clearable></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="6">
                    <el-form-item label="是否追踪">
                        <el-radio-group v-model="entity.onTrace">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="是"></el-radio-button>
                            <el-radio-button label="否"></el-radio-button>
                        </el-radio-group>
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
                    <el-form-item label="负责人">
                        <el-input v-model="entity.charge" placeholder="输入负责人" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="系列">
                        <el-input v-model="entity.series" placeholder="输入系列" clearable></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="6">
                    <el-form-item label="事业部">
                        <el-input v-model="entity.division" placeholder="输入事业部" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                     <el-form-item>
                        <el-button size="mini" type="danger" style="width: 150px" @click="handleDeleteAll(entity)">按查询条件删除</el-button>
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
            prop="itemCode"
            label="料号">
            </el-table-column>
            <el-table-column
            prop="itemName"
            label="料号简称">
            </el-table-column>
            <el-table-column
            prop="onTrace"
            label="是否追踪">
            </el-table-column>
             <el-table-column
            prop="charge"
            label="负责人">
            </el-table-column>
             <el-table-column
            prop="series"
            label="系列">
            </el-table-column>
             <el-table-column
            prop="division"
            label="事业部">
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
                        <el-form-item label="料号" :label-width="formLabelWidth">
                            <el-input v-model="single.itemCode" :readonly="readonly" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="料号简称" :label-width="formLabelWidth">
                            <el-input v-model="single.itemName" :readonly="readonly" clearable></el-input>
                        </el-form-item>
                   </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="负责人" :label-width="formLabelWidth">
                            <el-input v-model="single.charge" :readonly="readonly" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="系列" :label-width="formLabelWidth">
                            <el-input v-model="single.series" :readonly="readonly" clearable></el-input>
                        </el-form-item>
                   </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="事业部" :label-width="formLabelWidth">
                            <el-input v-model="single.division" :readonly="readonly" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否追踪">
                            <el-input v-model="single.onTrace" v-if="readonly" :readonly="readonly"></el-input>
                            <el-radio-group v-model="single.onTrace" v-else >
                                <el-radio-button label="是"></el-radio-button>
                                <el-radio-button label="否"></el-radio-button>
                            </el-radio-group>
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
            url: this.$url+'T_MANUAL_NEWS_EC_LIST_STATE/import',
            headers: { token : localStorage.getItem('token') },
            entity: {
                onTrace: ""
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
            this.$message({
                showClose: true,
                type: 'error',
                message: err
            }); 
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
            this.$axios.get('/T_MANUAL_NEWS_EC_LIST_STATE',{params:entity}).then(res=>{
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
            this.single.oldItemCode=this.single.itemCode;
            this.readonly=boolean;
            this.dialogFormVisible = true;
        },
        handleCancel() {
            this.dialogFormVisible = false;
            this.single={};
        },
        handleSubmit(single,boolean) {
            if(!boolean) {
                this.$axios.put('/T_MANUAL_NEWS_EC_LIST_STATE',single).then(res=>{
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
        handleDeleteAll(entity)  {
            this.$confirm('此操作将永久删除数据, 是否按查询条件删除?', '删除确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete('/T_MANUAL_NEWS_EC_LIST_STATE/delete',{params:entity}).then(res=>{
                        if(res.status=='200'){                              
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });    
                            this.handleSearch(this.entity);     
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            }); 
                        }
                    }) 
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleDownload() {//模板下载
            this.$axios.get('/T_MANUAL_NEWS_EC_LIST_STATE/file',{responseType: 'blob'}).then(res=>{
                    console.log(res);
                    if (!res) {
                        return
                    }
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                     console.log(url);
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', '新品目标清单模板.xlsx')
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