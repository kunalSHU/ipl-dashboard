package com.valorant.ipl.batchprocessing;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StringPermutation {

     public static void main(String[] args) {
         StringPermutation sp = new StringPermutation();
//         System.out.println(sp.stringPerm("abc"));
//         System.out.println(sp.missingNumber(Arrays.asList(9,6,4,2,3,5,7,0,1)));
         sp.palindromeQuiz("b?a?");
     }

     public Integer missingNumber(List<Integer> numList) {

         int arr_total = 0;
         for (int i = 0; i < numList.size(); i++) {
             arr_total += numList.get(i);
         }

         int maxNum = Collections.max(numList);
         int minNum = Collections.min(numList);
         int num_total = 0;
         for (int i = minNum; i <= maxNum; i++) {
             num_total += i;
         }
         return num_total - arr_total;
     }

     public Object palindromeQuiz(String s) {
         // "?ab??a"
         // "bab??a"
         char[] charArr = s.toCharArray();
         System.out.println(charArr);

         int i = 0;
         int j = s.length() - 1;

         while (i < j) {
             System.out.println(i);
             System.out.println(j);
             if (charArr[i] == '?' && charArr[j] != '?') {
                 charArr[i] = charArr[j];
             } else if (charArr[i] != '?' && charArr[j] == '?') {
                 charArr[j] = charArr[i];
             } else if (charArr[i] == '?' && charArr[j] == '?') {
                 charArr[i] = 'z';
                 charArr[j] = 'z';
             }
             i++;
             j--;
         }
        System.out.println(charArr);
        String result = String.valueOf(charArr);
        System.out.println(result);
        StringBuilder reverseRes = new StringBuilder();
        for (int x = 0; x < result.length(); x++) {
            reverseRes.append(result.charAt(i));
        }
        System.out.println(reverseRes);
        String f = new StringBuilder(result).reverse().toString();
        System.out.println(f);
         System.out.println(result.equals(f));

         return null;

     }

     public List<Object> stringPerm(String s) {  //abc -> [a, b, c]
         List<Object> stringList = new ArrayList<>();
         if (s.length() == 1) {
            stringList.add(s);
            return stringList;
        } else if (s.length() == 2) {
            stringList.add(s);
            String flipped = s.substring(1) + s.charAt(0); // [a + bc, a + cb]
            stringList.add(flipped);
            System.out.println(stringList);
            return stringList;
        } else {
            List<String> letterList = Arrays.asList(s.split(""));
            AtomicInteger atomicInteger = new AtomicInteger(0);
            List<List<String>> result = letterList.stream().map(l -> {
                int i = atomicInteger.getAndIncrement();
                System.out.println(i);
                System.out.println(s.substring(0, i) + s.substring(i + 1));
                return stringPerm(s.substring(0, i) + s.substring(i + 1)).stream().map(val -> l + val).collect(Collectors.toList());
            }).collect(Collectors.toList());
             return result.stream().flatMap(Collection::stream).collect(Collectors.toList());
        }
     }
}
