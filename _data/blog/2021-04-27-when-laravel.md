---
template: BlogPost
path: /when
date: 2021-04-27T05:08:25.056Z
title: Laravelでwhenを使う方法
metaDescription: laravelでwhenを使う方法
thumbnail: /assets/4012693_l.jpg
---
whenの書き方をメモ。

xxxx(model名)

\->select('*')

\->withCount('user')

\->when($id,function($query,$value) {

$query->where('xxxx.id',$value);

})

\->when($id,function($query,$value) {

$query->whereIn('xxxx.id',$value);

})
