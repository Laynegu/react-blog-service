'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // async index() {
  //   const { ctx, app } = this;
  //   // 获取用户列表数据
  //   let ret = await app.mysql.get('blog_content', {});
  //   ctx.body = ret;
  // }

  // 博客首页列表信息接口
  async getArticleList() {
    const { ctx, app } = this;
    let sql = `select 
                  a.id as id, 
                  a.title as title, 
                  a.introduction as introduction, 
                  DATE_FORMAT(a.add_time, '%Y-%m-%d') as publicTime, 
                  a.view_count as viewCount,
                  a.tab_name as tabName
                from 
                  article a`;
    const data = await app.mysql.query(sql);
    ctx.body = { data };
  }

  // 博客详情页内容接口
  async getArticleById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let sql = `select 
                  a.id as id, 
                  a.title as title, 
                  DATE_FORMAT(a.add_time, '%Y-%m-%d') as publicTime, 
                  a.view_count as viewCount,
                  a.tab_name as tabName,
                  a.article_content as articleContent,
                  a.type_id as typeId,
                  t.type_name as typeName 
                from 
                  article a
                left join
                  type t
                on
                  a.type_id = t.id 
                where
                  a.id = ${id}`;
    const data = await app.mysql.query(sql);
    ctx.body = { data };
  }

  // 博客内容类别查询
  async getTypeInfo() {
    const { ctx, app } = this;
    const data = await app.mysql.select('type');
    ctx.body = { data };
  }

  // 根据类别ID获得文章列表
  async getListById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let sql = `select 
                  a.id as id, 
                  a.title as title, 
                  DATE_FORMAT(a.add_time, '%Y-%m-%d') as publicTime, 
                  a.view_count as viewCount,
                  a.tab_name as tabName,
                  a.introduction as introduction,
                  a.type_id as typeId,
                  t.type_name as typeName 
                from 
                  article a
                left join
                  type t
                on
                  a.type_id = t.id 
                where
                  a.type_id = ${id}`;
    const data = await app.mysql.query(sql);
    ctx.body = { data };
  }

}

module.exports = HomeController;               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 