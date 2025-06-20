package moveAPI

import (
	"encoding/json"
	"net/http"
	"SQL/handleSQL"

	_ "github.com/go-sql-driver/mysql"
)

func GetMovesByKeyWord(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	keyWord := query.Get("KeyWord")

	moves := handleSQL.SelectMovesByKeyWord(keyWord)

	err := json.NewEncoder(w).Encode(moves)
	if err != nil {
		return
	} 
}