---
date: 2023-08-03 13:14:06
updated: 2024-10-08 15:27:11
article: false
order: 5
title: 图片上传
---
static 和 media 都是存放文件的地方，但是又有区别，以下是两个文件夹的区别和用法

## static

static 是静态文件，主要存的是 CSS, JavaScript, 网站 logo 等不变的文件。

配置 `settings.py`

```python
STATIC_URL = '/static/'  # 静态文件别名（相对路径） 和 绝对路径
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'app01/static'),
]
# STATIC_ROOT 配置部署的时候才用
```

在项目中将模板层用到的静态文件都放入该文件夹中

## media

media 主要用来保存用户上传的文件，例如图片等

配置 `settings.py`

```python
MEDIA_URL = "/media/"   # 媒体文件别名(相对路径) 和 绝对路径
MEDIA_ROOT = [
    os.path.join(BASE_DIR, 'app01/media')
]
```

如果需要使用Django服务展示图片，则在项目的主路由中对使用 static静态服务器展示图片信息。

```python
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django01 import settings

urlpatterns = [
    ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# 对外展示图片的地址信息
```

## 图片上传示例

### 模型

定义包含图片字段的模型类

```python
class Goods(models.Model):
    name = models.CharField(max_length=20, verbose_name="名称")
    price = models.DecimalField(max_digits=7, decimal_places=2, verbose_name="单价")
    nums = models.IntegerField(verbose_name="数量")
    img = models.ImageField(upload_to='img', verbose_name="图片")

    class Meta:
        db_table = "tb_goods"
        verbose_name = "商品"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name
```

### 模板

#### 添加页面

```jinja2
<form action="{% url 'goods:create' %}" method="post" enctype="multipart/form-data">
    {% csrf_token %}
    名称:<input type="text" name="name"> <br>
    价格:<input type="text" name="price"> <br>
    数量:<input type="text" name="nums"> <br>
    图片:<input type="file" name="img"> <br>

    <input type="submit" value="提交">
</form>
```

#### 展示页面

```jinja2
<table>
    {% for good in goods %}
        <tr>
            <td>{{ good.id }}</td>
            <td>{{ good.name }}</td>
            <td>{{ good.price }}</td>
            <td>{{ good.nums }}</td>
            <td>
                <img src="/media/{{ good.img }}" alt="" style="width: 300px;height: 200px">
            </td>
        </tr>
    {% endfor %}
</table>
```

### 视图

#### 添加商品

```python
from django.shortcuts import render, redirect
from django.views import View
from app01.models import Goods


# Create your views here.
class GoodsCreateView(View):
    def get(self, request):
        return render(request, 'goods.html')

    def post(self, request):
        name = request.POST.get('name')
        price = request.POST.get('price')
        nums = request.POST.get('nums')
        img = request.FILES.get('img')

        if not all([name, price, nums, img]):
            return redirect('goods:create')

        try:
            Goods.objects.create(name=name, price=price, nums=nums, img=img)
        except Exception as e:
            print(e)
            return redirect('goods:create')
        return redirect('goods:index')
```

#### 展示商品

```python
class IndexView(View):
    def get(self, request):
        goods = Goods.objects.all()

        return render(request, 'index.html', context={'goods': goods})
```

### 路由

在子应用正常配置路由

```python
from django.urls import path
from app01.views import *
app_name = 'goods'

urlpatterns = [
    path('goods/', GoodsCreateView.as_view(), name='create'),
    path('', IndexView.as_view(), name='index'),
]
```

在主路由中包含子路由即可。

```python
from django.conf.urls.static import static
from django.urls import path, include
from django01 import settings

urlpatterns = [
    path('', include("goods.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
