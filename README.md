# Projekt

Zadanie rekrutacyjne do 'Coraz Lepsza Firma'. Proces zakupowy z wykorzystaniem bilioteki xState.

## Zmiany w stosunku do pierwotnych wymagań

Przyjąłem następujące relacje stan maszyny - widok

cart - koszyk
address (zmiana z adressed) - Formularz adresu
shipping_selected, shipping_skipped - Formularz metody dostawy
payment_selected, payment_skipped - Formularz metody płatności
summary (nowy stan) - Podsumowanie zamówienia
completed - informacja o powodzeniu / błędzie przetwarzania zamówienia
