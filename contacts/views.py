from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Contact message received successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['get'])
    def all_messages(self, request):
        messages = ContactMessage.objects.all()
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)
