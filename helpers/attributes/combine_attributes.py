import pandas as pd

# Read the CSV files
basic_info_df = pd.read_csv('country_info.csv')
driving_sides_df = pd.read_csv('country_driving_sides.csv')
coverage_df = pd.read_csv('country_coverage.csv')
region_df = pd.read_csv('country_region.csv')

# Print the missing country codes in basic_info_df
missing_rows = driving_sides_df[~driving_sides_df['iso_alpha2'].isin(basic_info_df['iso_alpha2'])]
print(f"Missing the following rows in {'basic_country_info.csv'}\n", missing_rows['iso_alpha2'])

# Print the missing country codes in basic_info_df
missing_rows = coverage_df[~coverage_df['iso_alpha2'].isin(basic_info_df['iso_alpha2'])]
print(f"Missing the following rows in {'basic_country_info.csv'}\n", missing_rows['iso_alpha2'])

# Perform a left join on country_code
merged_df = pd.merge(basic_info_df, driving_sides_df, on='iso_alpha2', how='left')

# Print the missing country codes in driving_sides_df
missing_rows = basic_info_df[~basic_info_df['iso_alpha2'].isin(driving_sides_df['iso_alpha2'])]
print(f"Missing the following rows in {'country_driving_sides.csv'}\n", missing_rows['iso_alpha2'])

# Perform a left join on country_code
merged_df = pd.merge(merged_df, coverage_df, on='iso_alpha2', how='left')

# Print the missing country codes in coverage_df
missing_rows = merged_df[merged_df['coverage'].isnull()]
print(f"Missing the following rows in {'country_coverage.csv'}\n", missing_rows['iso_alpha2'])

# Perform a left join on iso_alpha2
merged_df = pd.merge(merged_df, region_df, on='iso_alpha2', how='left')

# Print the missing country codes in region_df
missing_rows = merged_df[merged_df['iso_alpha3'].isnull()]
print(f"Missing the following rows in {'country_region.csv'}\n", missing_rows['iso_alpha2'])

# Fill missing driving_side values with null
merged_df['driving_side'] = merged_df['driving_side'].fillna('null')

# Fix namibia's iso_alpha2 code
merged_df["iso_alpha2"] = merged_df["iso_alpha2"].fillna('NA')

# Move iso_alpha2 to the first column nad iso_alpha3 to the second column
merged_df = merged_df[['iso_alpha2', 'iso_alpha3', 'country_name', 'flag_emoji', 'driving_side', 'coverage', 'continent', 'region']]

# Print any duplicated rows
duplicated_rows = merged_df[merged_df.duplicated()]
print("Duplicated rows\n", duplicated_rows)

# Save the merged dataframe to a new CSV file
merged_df.to_csv('merged_country_info.csv', index=False)