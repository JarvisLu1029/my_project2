from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from .web_crawling import carrefour_data, pchome_data, pxmart_data
import threading, queue

# Create your views here.
@api_view(['GET'])
@csrf_exempt
def commodity_infos(request):

    commodity = request.GET.get('keyword')
    print(commodity)
    # 將 web_crawling 裡要執行的 func 放在這個 list
    tasks = [carrefour_data, pchome_data, pxmart_data]
    q = queue.Queue()
    all_thread = []

    for task in tasks:
        thread = threading.Thread(target=task, args=(q, commodity))
        thread.start()
        all_thread.append(thread)

    for t in all_thread:
        t.join()

    total_list = []
    n = 1
    while not q.empty():
        results = q.get()

        for i in results:
            total_list.append({
                'id': n,
                'name': results[i]['commodity_name'],
                'price': results[i]['commodity_value'],
                'img_url': results[i]['commodity_image'],
                'product_url': results[i]['commodity_link'],
                'store': results[i]['store']
            })
            n += 1

    return JsonResponse({'data': total_list}, status=200)
