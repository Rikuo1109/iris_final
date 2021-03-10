from rest_framework import routers
from django.urls import path
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register('', views.ProductViewSet, basename='product')
# router.register('', views.PopularProduct.as_view(), basename='testing')

urlpatterns = router.urls + [path('list_product/', views.PopularProduct.as_view(), name='List Product'),\
                                path('category_tree/', views.CategoryTree.as_view(), name='Category tree')]