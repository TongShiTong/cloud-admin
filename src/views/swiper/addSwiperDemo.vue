<template>
  <div class="add-swiper-demo">
    <el-form :model="formData">
      <el-form-item label="轮播图标题">
        <el-input v-model="formData.title" class="form-500"></el-input>
      </el-form-item>
      <el-form-item label="轮播图书籍">
        <el-select v-model="formData.category" @change="categoryChange">
          <el-option v-for="(item, index) in categoryData"
                     :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>

        <div class="book-item clearfix" v-if="getBookItem[0]">
          <div class="img-wrap">
            <img :src="getBookItem[0].img">
          </div>
          <div class="book-desc">
            <div class="title">
              标题：{{getBookItem[0].title}}
            </div>
            <div class="author">
              作者：{{getBookItem[0].author}}
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="轮播图头图">
        <uploadImg v-model="formData.img" style="float: left"></uploadImg>
      </el-form-item>
      <el-form-item label="轮播图排序">
        <el-input-number v-model="formData.index" :min="1"></el-input-number>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="handleSubmit">提交</el-button>

    <el-dialog title="书籍列表" :visible.sync="isShowDialog">
      <el-table :data="bookData">
        <el-table-column property="title" label="书名" width="150"></el-table-column>
        <el-table-column label="书籍头图" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="img-item">
          </template>
        </el-table-column>
        <el-table-column property="author" label="作者"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleAddBook(scope.row._id)">
              添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
    export default {
      name: "addSwiperDemo",
      data () {
        return {
          formData: {
            title: '',
            img: '',
            book: '',
            index: '',
            category: ''
          },
          categoryData: [],
          bookData: [],
          bookCount: 0,
          isShowDialog: false
        }
      },
      methods: {
        getCategory() {
          this.$axios.get('/category').then(res => {
            this.categoryData = res.data
          })
        },
        async getBookData() {
          const res = await this.$axios.get(`/category/${this.formData.category}/books`)
          this.bookData = res.data.books
          this.bookCount = res.count
        },
        categoryChange() {
          this.isShowDialog = true
          this.getBookData()
        },
        handleAddBook(id) {
          this.formData.book = id
          this.isShowDialog = false
        },
        handleSubmit () {
        //  数据书籍检验
          let isCanSubmit = true
          for(let key in this.formData) {
            if (!this.formData[key]) {
              isCanSubmit = false
            }
          }
          if (isCanSubmit) {
            this.$axios.post('/swiper', this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push({name: 'Swiper'})
              }
            })
          } else {
            this.$message.error('缺少必要参数')
          }
        }
      },
      created () {
        this.getCategory()
      },
      computed: {
        getBookItem() {
          if (this.formData.book) {  //如果有值用户已经选择了一本书
            return this.bookData.filter(item => item._id == this.formData.book)
          } else {
            return []
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .img-item {
    width: 80px;
    height: 100px;
  }
  .form-500 {
    width: 500px;
  }

  .book-item {
    margin-top: 20px;
    width: 430px;
    padding: 15px;
    border: 1px solid #999;
    border-radius: 4px;

    .img-wrap {
      float: left;
      width: 100px;
      height: 120px;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .book-desc {
      float: left;
      margin-left: 20px;

      .title {
        color: #333;
        font-weight: 700;
        font-size: 15px;
        line-height: 1.5;
      }

      .author {
        line-height: 1;
        color: #555;
      }
    }
  }

  .clearfix::after {
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }
</style>
