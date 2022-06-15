'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  // 验证登录
  async checkLogin() {
    const { ctx, app } = this;

    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    const sql = ` select 
                    username 
                  from 
                    admin_user 
                  where 
                    username='${username}'
                  and 
                    password='${password}'`;
    const ret = await app.mysql.query(sql);

    if (ret.length > 0) {
      // 登录成功，设置时间戳
      // let openId = new Date().getTime();
      // ctx.session.openId = { openId };
      // ctx.body = { data: '登录成功', openId };

      // 利用jwt鉴权
      const token = app.jwt.sign({ username }, app.config.jwt.secret, { expiresIn: '1h' });
      ctx.body = { data: '登录成功', token };
    } else {
      // 登录失败
      ctx.body = { data: '登录失败' };
    }
  }

  // 获取博客文章类型
  async getTypeInfo() {
    const { ctx, app } = this;
    let ret = await app.mysql.select('type');
    ctx.body = { data: ret };
  }

  // 添加文章
  async addArticle() {
    const { ctx, app } = this;
    let tempArticle = ctx.request.body;
    const ret = await app.mysql.insert('article', tempArticle);
    ctx.body = {
      isAddSuccess: ret.affectedRows === 1,
      insertId: ret.insertId,
    }
  }

  // 更新文章
  async updateArticle() {
    const { ctx, app } = this;
    let tempArticle = ctx.request.body;
    const ret = await app.mysql.update('article', tempArticle);
    ctx.body = {
      isUpdateSuccess: ret.affectedRows === 1,
    }
  }

  // 获得文章列表
  async getArticleList() {
    const { ctx, app } = this;
    let sql = `select 
                  a.id as id, 
                  a.title as title,
                  t.type_name as type,  
                  DATE_FORMAT(a.add_time, '%Y-%m-%d') as publishDate, 
                  a.tab_name as tags,
                  a.view_count as viewCount
                from 
                  article a
                left join
                  type t
                on
                  a.type_id = t.id`;
    const data = await app.mysql.query(sql);
    ctx.body = { data };
  }

  // 删除指定文章
  async delArticle() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    const ret = await app.mysql.delete('article', {id});
    ctx.body = {data: ret};
  }

  // 获取指定文章
  async getArticleById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let sql = `select 
                  a.id as id, 
                  a.title as title,
                  a.type_id as typeId,
                  t.type_name as typeName,  
                  DATE_FORMAT(a.add_time, '%Y-%m-%d') as publishDate, 
                  a.tab_name as tabName,
                  a.view_count as viewCount,
                  a.introduction as articleIntro,
                  a.article_content as articleContent
                from 
                  article a
                left join
                  type t
                on
                  a.type_id = t.id
                where
                  a.id = ${id}`;
    const data = await app.mysql.query(sql);
    ctx.body = {data};
  }

}

module.exports = MainController; 
