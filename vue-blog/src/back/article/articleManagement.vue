<template>
  <div class="article-box">
    <div class="operation-box">
      <ButtonGroup>
        <Button type="success" icon="md-add" @click="()=>{$router.push('/addArticle')}">新增</Button>
      </ButtonGroup>
    </div>
    <Table border :columns="columns" :data="data" :no-data-text="noData" :ellipsis="true"></Table>
    <div class="page">
      <Page
        :total="dataPage.countTotal"
        :page-size="dataPage.pageSize"
        @on-change="tabData"
        show-elevator
        show-total
        v-show="data.length != 0"
      />
    </div>
  </div>
</template>

<script>
import qs from "querystring";
export default {
  inject: ['reload'],
  data() {
    return {
      noData: "暂无数据",
      modal: false,
      columns: [
        {
          title: "ID",
          key: "id",
          sortable: true,
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "内容",
          key: "content",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  domProps: {
                    content: params.row.content
                  }
                },
                params.row.content
              )
            ]);
          }
        },
        {
          title: "阅读量",
          key: "readingVolume",
          sortable: true,
        },
        {
          title: "创建时间",
          key: "releaseTime",
          sortable: true,
        },
        {
          title: "上次修改时间",
          key: "modificationTime",
          sortable: true,
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "updataArticle",
                        params: {
                          id: params.row.id
                        }
                      });
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        content: `<p>确定要删除文章<h3><br> ${
                          params.row.title
                        } </h3></p>`,
                        onOk: () => {
                          this.remove(params.row);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      dataPage: []
    };
  },
  mounted() {
    this.getArticleData(1);
  },
  methods: {
    // 分页
    tabData(e) {
      this.getArticleData(e);
    },
    // 删除文章
    remove(e) {
      this.$http
        .post("/cgi-bin/article_delete.py", { id: e.id }, { emulateJSON: true })
        .then(resp => {
          // console.log(resp);
          if (resp.data == "success") {
            this.$Message.success("删除成功");
            // this.getArticleData(1);
            this.reload();
          } else {
            this.$Message.error("删除失败");
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    // 获取数据
    getArticleData(pageNum) {
      this.$http
        .post(
          "/cgi-bin/article_select_all_page.py",
          {
            pageNum: pageNum,
            isConvertFormat: true
          },
          {
            emulateJSON: true
          }
        )
        .then(resp => {
          // console.log(resp);
          this.dataPage = resp.data;
          this.data = resp.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.article-box {
  padding: 1.25em;
  .operation-box {
    margin-bottom: 1.25em;
  }
  .page {
    padding: 1.25em;
    text-align: center;
  }
}
</style>