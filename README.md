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

Zamiast osobnych tranzycji select_shipping i skip_shipping użyłem tranzycji shipping ze strażnikiem (guard). Analogicznie w przypadku select_payment / skip_payment.

Dodałem możliwość powrotu do dowolnego kroku.
