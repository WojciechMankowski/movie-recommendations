Sub ObliczOptimized()
  Dim ws As Worksheet
  Dim data As Variant
  Dim results() As Variant
  Dim formulas() As Variant
  Dim i As Long, lastRow As Long
  Dim parament As String
  Dim wartosc As Variant
  Dim rok As Variant
  Dim parts() As String
  
  Application.Calculation = xlCalculationManual
  
  Set ws = ActiveSheet
  lastRow = ws.Range("B" & ws.Rows.Count).End(xlUp).Row
  data = ws.Range("B9:B" & lastRow).Value
  ReDim results(1 To UBound(data, 1), 1 To 3)
  
  For i = 1 To UBound(data, 1)
    Select Case True
      Case data(i, 1) Like "M-#"
        parts = Split(data(i, 1), "-")
        results(i, 1) = parts(0)
        results(i, 2) = Format(CInt(parts(1)), "00")
        results(i, 3) = ""
        
      Case data(i, 1) Like "M-##"
        parts = Split(data(i, 1), "-")
        results(i, 1) = parts(0)
        results(i, 2) = Format(CInt(parts(1)), "00")
        results(i, 3) = ""
        
      Case data(i, 1) Like "Q-#-####"
        parts = Split(data(i, 1), "-")
        results(i, 1) = parts(0)
        results(i, 2) = parts(1)
        results(i, 3) = parts(2)
        
      Case data(i, 1) Like "Y-####"
        parts = Split(data(i, 1), "-")
        results(i, 1) = parts(0)
        results(i, 2) = parts(1)
        results(i, 3) = ""
        
      Case Else
        results(i, 1) = "N/A"
        results(i, 2) = "N/A"
        results(i, 3) = "N/A"
    End Select
  Next i
  
  ws.Range("C9:E" & lastRow).Value = results
  
  ReDim formulas(1 To UBound(data, 1), 1 To 4)
  
  For i = 1 To UBound(data, 1)
    If results(i, 1) <> "N/A" Then
      parament = results(i, 1)
      wartosc = results(i, 2)
      rok = results(i, 3)
      
      If parament = "M" Then
        formulas(i, 1) = "=IFERROR(IF(AVERAGEIF('Krzywa forward'!$B:$B, """ & wartosc & """, 'Krzywa forward'!$AE:$AE)=0, ""Brak danych"", AVERAGEIF('Krzywa forward'!$B:$B, """ & wartosc & """, 'Krzywa forward'!$AE:$AE)), ""Brak danych"")"
        formulas(i, 2) = "=IFERROR(IF(AVERAGEIF('Grafik zużycia'!B:B, """ & wartosc & """, 'Grafik zużycia'!AD:AD)=0, ""Brak danych"", AVERAGEIF('Grafik zużycia'!B:B, """ & wartosc & """, 'Grafik zużycia'!AD:AD)), ""Brak danych"")"
        formulas(i, 3) = "=IFERROR(IF(MINIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$B:$B, """ & wartosc & """)=0, ""Brak danych"", MINIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$B:$B, """ & wartosc & """)), ""Brak danych"")"
        formulas(i, 4) = "=IFERROR(IF(MAXIFS('Krzywa forward'!$AG:$AG, 'Krzywa forward'!$B:$B, """ & wartosc & """)=0, ""Brak danych"", MAXIFS('Krzywa forward'!$AG:$AG, 'Krzywa forward'!$B:$B, """ & wartosc & """)), ""Brak danych"")"
        
      ElseIf parament = "Q" Then
        formulas(i, 1) = "=IFERROR(IF(AVERAGEIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$C:$C, """ & wartosc & """, 'Krzywa forward'!$D:$D, """ & rok & """)=0, ""Brak danych"", AVERAGEIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$C:$C, """ & wartosc & """, 'Krzywa forward'!$D:$D, """ & rok & """)), ""Brak danych"")"
        formulas(i, 2) = "=IFERROR(IF(AVERAGEIFS('Grafik zużycia'!$AD:$AD, 'Grafik zużycia'!$C:$C, """ & wartosc & """, 'Grafik zużycia'!$D:$D, """ & rok & """)=0, ""Brak danych"", AVERAGEIFS('Grafik zużycia'!$AD:$AD, 'Grafik zużycia'!$C:$C, """ & wartosc & """, 'Grafik zużycia'!$D:$D, """ & rok & """)), ""Brak danych"")"
        formulas(i, 3) = "=IFERROR(IF(MINIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$C:$C, """ & wartosc & """, 'Krzywa forward'!$D:$D, """ & rok & """)=0, ""Brak danych"", MINIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$C:$C, """ & wartosc & """, 'Krzywa forward'!$D:$D, """ & rok & """)), ""Brak danych"")"
        formulas(i, 4) = "=IFERROR(IF(MAXIFS('Krzywa forward'!$AG:$AG, 'Krzywa forward'!$C:$C, """ & wartosc & """, 'Krzywa forward'!$D:$D, """ & rok & """)=0, ""Brak danych"", MAXIFS('Krzywa forward'!$AG:$AG, 'Krzywa forward'!$C:$C, """ & wartosc & """, 'Krzywa forward'!$D:$D, """ & rok & """)), ""Brak danych"")"
        
      ElseIf parament = "Y" Then
        formulas(i, 1) = "=IFERROR(IF(AVERAGEIF('Krzywa forward'!$D:$D, """ & wartosc & """, 'Krzywa forward'!$AE:$AE)=0, ""Brak danych"", AVERAGEIF('Krzywa forward'!$D:$D, """ & wartosc & """, 'Krzywa forward'!$AE:$AE)), ""Brak danych"")"
        formulas(i, 2) = "=IFERROR(IF(AVERAGEIF('Grafik zużycia'!D:D, """ & wartosc & """, 'Grafik zużycia'!AD:AD)=0, ""Brak danych"", AVERAGEIF('Grafik zużycia'!D:D, """ & wartosc & """, 'Grafik zużycia'!AD:AD)), ""Brak danych"")"
        formulas(i, 3) = "=IFERROR(IF(MINIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$D:$D, """ & wartosc & """)=0, ""Brak danych"", MINIFS('Krzywa forward'!$AE:$AE, 'Krzywa forward'!$D:$D, """ & wartosc & """)), ""Brak danych"")"
        formulas(i, 4) = "=IFERROR(IF(MAXIFS('Krzywa forward'!$AG:$AG, 'Krzywa forward'!$D:$D, """ & wartosc & """)=0, ""Brak danych"", MAXIFS('Krzywa forward'!$AG:$AG, 'Krzywa forward'!$D:$D, """ & wartosc & """)), ""Brak danych"")"
        
      End If
    End If
  Next i

  ws.Range("F9:I" & lastRow).Formula = formulas
  ws.Columns("C:E").EntireColumn.Hidden = True
  
  Application.Calculation = xlCalculationAutomatic
End Sub

