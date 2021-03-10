from rest_framework import routers
from django.urls import path
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register('', views.ProductViewSet, basename='product')
# router.register('', views.PopularProduct.as_view(), basename='testing')

urlpatterns = router.urls + [path('test/', views.PopularProduct.as_view(), name='Testing')]