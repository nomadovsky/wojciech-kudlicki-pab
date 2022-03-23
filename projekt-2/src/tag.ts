/*Pobranie listy notatek. Pobiera listę notatek
*1. Endpoint GET /notes
*Zwraca kod 200 wraz z listą notatek. Jeśli błąd zwraca 400 z opisem błędu
*2. Zbuduj Api do tagów - lista tagów oraz CRUD tag-u (analogicznie do notatek).
*Model tag-u:
*id?: number
*name: string
--- Adresy endpointów: /tag, lista tagów: /tags 
--Tagi powinny być unikalne. Sprawdzania dokonujemy bez uwzględniania wielkości znaków
* 3. Zmodyfikuj model notatki (zmiana tags: string[] na tags: Tag[])
4. Zmodyfikuj logikę endpointów dodawania i edycji notatki - jeśli podanych w notatce tagów nie ma na liście, to automatycznie dodajemy nowe tagi do listy.
5. Wykorzystaj system plików do zapisu informacji o tagach i notatkach.
6. Skopiuj plik konfiguracyjny do nodemon (ignorowanie zmian w pliku z danymi)
*/

export interface Tag {
  id?: number;
  name: string;
}

export function getTag(id: number) {}
