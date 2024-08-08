import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yc2djZG5sbGNua3Vqa3VlYmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMTE0MjgsImV4cCI6MjAzNzY4NzQyOH0.uBlws4yWF7MOxod6jjWoNPZvpG29kyLflie7NNKJWQQ';
    const url = 'https://orsgcdnllcnkujkuebfp.supabase.co';
    this.supabase = createClient(url, apiKey);
  }

  async getUsers() {
    const { data, error } = await this.supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data;
  }
  
  async getFoglalkozasokFile() {
    const { data, error } = await this.supabase
      .from('foglalkozasok_data')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return "";
    }

    return data ? data[0]?.foglalkozasok_text as string : "";
  }
  /*
  async addUser(name: string, email: string) {
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ name, email }]);

    if (error) {
      console.error('Error adding user:', error);
      return null;
    }

    return data;
  }
  */
}
