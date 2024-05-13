# Projekt

Zadanie rekrutacyjne do 'Coraz Lepsza Firma'. Proces zakupowy z wykorzystaniem bilioteki xState.

## Objaśnienia i zmiany w stosunku do pierwotnych wymagań

Przyjąłem następujące relacje stan maszyny - widok

cart - koszyk
address (zmiana z adressed) - Formularz adresu
shipping_selected, shipping_skipped - Formularz metody dostawy
payment_selected, payment_skipped - Formularz metody płatności
summary (nowy stan) - Podsumowanie zamówienia
completed (+ nowe stany: completing, error_on_completing) - informacja o przetwarzaniu, powodzeniu lub błędzie przetwarzania zamówienia

Zamiast osobnych tranzycji select_shipping i skip_shipping użyłem tranzycji shipping ze strażnikiem (guard). Analogicznie w przypadku select_payment / skip_payment.

Dodałem możliwość powrotu do dowolnego kroku.

"W zależności od wybranego kraju, użytkownik powinien mieć dostęp do dwóch metod wysyłki –
jedna specyficzna dla Polski, druga dostępna dla obu krajów"

Rozumiem to w ten sposób, że dla polski są dwie metody wysyłki A (specyficzna dla Polski) i B, a dla USA tylko B.

Dla każdego produktu przydzielone jest dodatkowo id (i wysyłane do endpointu)
