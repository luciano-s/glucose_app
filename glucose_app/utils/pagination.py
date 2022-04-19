from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagePagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = "page_size"

    def get_paginated_response(self, data):
        return Response(
            {
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "results": data,
                "page_size": self.page_size,
            }
        )

    def get_page_size(self, request):
        page_size = request.query_params.get("page_size", None)
        if page_size is not None:
            self.page_size = page_size
        return self.page_size
