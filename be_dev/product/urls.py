from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register('', views.ProductViewSet, basename='product')

urlpatterns = router.urls